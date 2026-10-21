import path from 'node:path'
import { execa } from 'execa'
import { repoRoot } from './talks.ts'

export const TALK_COMMANDS = ['dev', 'build', 'export'] as const
export type TalkCommand = typeof TALK_COMMANDS[number]

const SITE_BASE = '/lightning-talks/'
const RAW_MAIN_URL = 'https://raw.githubusercontent.com/PhyberApex/lightning-talks/main/'

export function isTalkCommand(value: string | undefined): value is TalkCommand {
  return (TALK_COMMANDS as readonly string[]).includes(value ?? '')
}

export function downloadUrl(slug: string) {
  return `${RAW_MAIN_URL}${slug}/${slug}.pdf`
}

export function slidevArgs(command: TalkCommand, slug: string): string[] {
  switch (command) {
    case 'dev':
      return []
    case 'build':
      return ['build', '--base', `${SITE_BASE}${slug}/`, '--out', `../../dist/${slug}`]
    case 'export':
      return ['export', '--per-slide', '--output', `../${slug}.pdf`]
  }
}

export async function runSlidev(command: TalkCommand, slug: string) {
  await execa('pnpm', ['exec', 'slidev', ...slidevArgs(command, slug)], {
    cwd: path.join(repoRoot, slug, 'src'),
    stdio: 'inherit',
  })
}
