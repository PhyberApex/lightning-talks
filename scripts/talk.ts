import process from 'node:process'
import { isTalkCommand, runSlidev, TALK_COMMANDS } from './slidev.ts'
import { listDeckSlugs, repoRoot } from './talks.ts'

const BUILD_CONCURRENCY = 4

async function runPool<T>(items: T[], limit: number, worker: (item: T) => Promise<void>) {
  const queue = [...items]
  const workers = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length > 0)
      await worker(queue.shift()!)
  })
  await Promise.all(workers)
}

const [command, target] = process.argv.slice(2)

if (!isTalkCommand(command) || !target) {
  console.error(`Usage: tsx scripts/talk.ts <${TALK_COMMANDS.join('|')}> <folder|--all>`)
  process.exit(1)
}

const slugs = target === '--all' ? listDeckSlugs(repoRoot) : [target]
const concurrency = command === 'build' ? BUILD_CONCURRENCY : 1

await runPool(slugs, concurrency, slug => runSlidev(command, slug))
