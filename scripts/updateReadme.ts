import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { readTalks, renderReadme, renderTalkReadme, repoRoot } from './talks.ts'

const talks = readTalks(repoRoot)
const rootReadme = path.join(repoRoot, 'README.md')
const readmes = [
  {
    target: rootReadme,
    content: renderReadme(fs.readFileSync(rootReadme, 'utf8'), talks),
  },
  ...talks.map(talk => ({
    target: path.join(repoRoot, talk.slug, 'README.md'),
    content: renderTalkReadme(talk),
  })),
]
const stale = readmes.filter(({ target, content }) => !fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== content)

if (process.argv.includes('--check')) {
  if (stale.length > 0) {
    for (const { target } of stale)
      console.error(`${path.relative(repoRoot, target)} is out of date`)
    console.error('Run `pnpm run readme` and commit the result.')
    process.exit(1)
  }
  console.log('README.md and all talk READMEs are up to date')
}
else {
  for (const { target, content } of stale)
    fs.writeFileSync(target, content)
  console.log(`Updated ${stale.length} README file(s)`)
}
