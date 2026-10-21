import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readTalks, renderIndexHtml } from './talks.ts'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const template = fs.readFileSync(path.join(rootDir, 'scripts/indexTemplate.html'), 'utf8')
const outputPath = path.join(rootDir, 'dist/index.html')

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, renderIndexHtml(template, readTalks(rootDir)))
console.log(`Generated ${outputPath}`)
