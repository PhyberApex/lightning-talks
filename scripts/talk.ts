import type { TalkCommand } from './slidev.ts'
import process from 'node:process'
import prompts from 'prompts'
import { isTalkCommand, runSlidev, TALK_COMMANDS } from './slidev.ts'
import { listDeckSlugs, repoRoot } from './talks.ts'

// Under pnpm, Slidev treats itself as globally installed and points every
// deck's Vite dependency cache at the same directory inside @slidev/cli, so
// concurrent exports overwrite each other's pre-bundled deps mid-render.
const CONCURRENCY: Record<TalkCommand, number> = { dev: 1, build: 4, export: 1 }

async function runPool<T>(items: T[], limit: number, worker: (item: T) => Promise<void>) {
  const queue = [...items]
  const workers = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length > 0)
      await worker(queue.shift()!)
  })
  await Promise.all(workers)
}

async function pickSlug(newestFirst: string[]): Promise<string | undefined> {
  const { folder } = await prompts({
    type: 'select',
    name: 'folder',
    message: 'Pick a folder',
    choices: newestFirst.map(slug => ({ title: slug, value: slug })),
  })
  return folder
}

async function resolveSlugs(target: string | undefined, skipPrompt: boolean): Promise<string[]> {
  const slugs = listDeckSlugs(repoRoot)
  if (target === '--all')
    return slugs
  if (target)
    return [target]
  const newestFirst = slugs.toReversed()
  const picked = skipPrompt ? newestFirst[0] : await pickSlug(newestFirst)
  return picked ? [picked] : []
}

const skipPrompt = process.argv.includes('-y')
const [command, target] = process.argv.slice(2).filter(arg => arg !== '-y')

if (!isTalkCommand(command)) {
  console.error(`Usage: tsx scripts/talk.ts <${TALK_COMMANDS.join('|')}> [folder|--all] [-y]`)
  process.exit(1)
}

const slugs = await resolveSlugs(target, skipPrompt)
await runPool(slugs, CONCURRENCY[command], slug => runSlidev(command, slug))
