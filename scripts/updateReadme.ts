import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { readTalks, renderReadme, repoRoot } from './talks.ts'

const readmePath = path.join(repoRoot, 'README.md')
const current = fs.readFileSync(readmePath, 'utf8')
const next = renderReadme(current, readTalks(repoRoot))

if (process.argv.includes('--check')) {
  if (current !== next) {
    console.error('README.md talks table is out of date. Run `pnpm run readme` and commit the result.')
    process.exit(1)
  }
  console.log('README.md talks table is up to date')
}
else {
  fs.writeFileSync(readmePath, next)
  console.log('Updated README.md talks table')
}
