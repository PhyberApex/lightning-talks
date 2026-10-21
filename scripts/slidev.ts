import fs from 'node:fs'
import path from 'node:path'
import { execa } from 'execa'
import { repoRoot } from './talks.ts'

export const TALK_COMMANDS = ['dev', 'build', 'export'] as const
export type TalkCommand = typeof TALK_COMMANDS[number]

const SITE_BASE = '/lightning-talks/'

export function isTalkCommand(value: string | undefined): value is TalkCommand {
  return (TALK_COMMANDS as readonly string[]).includes(value ?? '')
}

export function slidevArgs(command: TalkCommand, slug: string): string[] {
  switch (command) {
    case 'dev':
      return []
    case 'build':
      return ['build', '--base', `${SITE_BASE}${slug}/`, '--out', `../../dist/${slug}`]
    case 'export':
      return ['export', '--per-slide', '--output', `../../dist/${slug}/${slug}.pdf`]
  }
}

export async function runSlidev(command: TalkCommand, slug: string) {
  // slidev export writes the PDF without creating its parent directory.
  if (command === 'export')
    fs.mkdirSync(path.join(repoRoot, 'dist', slug), { recursive: true })
  await execa('pnpm', ['exec', 'slidev', ...slidevArgs(command, slug)], {
    cwd: path.join(repoRoot, slug, 'src'),
    stdio: 'inherit',
  })
}
