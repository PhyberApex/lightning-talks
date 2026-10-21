import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { readTalks, renderReadme, renderTalkReadme, repoRoot } from './talks.ts'

const talks = readTalks(repoRoot)
const rootReadme = path.join(repoRoot, 'README.md')
const files = [
  { file: rootReadme, next: renderReadme(fs.readFileSync(rootReadme, 'utf8'), talks) },
  ...talks.map(talk => ({ file: path.join(repoRoot, talk.slug, 'README.md'), next: renderTalkReadme(talk) })),
]
const stale = files.filter(({ file, next }) => !fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== next)

if (process.argv.includes('--check')) {
  if (stale.length > 0) {
    for (const { file } of stale)
      console.error(`${path.relative(repoRoot, file)} is out of date`)
    console.error('Run `pnpm run readme` and commit the result.')
    process.exit(1)
  }
  console.log('README.md and all talk READMEs are up to date')
}
else {
  for (const { file, next } of stale)
    fs.writeFileSync(file, next)
  console.log(`Updated ${stale.length} README file(s)`)
}
