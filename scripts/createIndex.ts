import fs from 'node:fs'
import path from 'node:path'
import { readTalks, renderIndexHtml, repoRoot } from './talks.ts'

const template = fs.readFileSync(path.join(repoRoot, 'scripts/indexTemplate.html'), 'utf8')
const outputPath = path.join(repoRoot, 'dist/index.html')

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, renderIndexHtml(template, readTalks(repoRoot)))
console.log(`Generated ${outputPath}`)
