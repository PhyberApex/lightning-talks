import fs from 'node:fs'
import path from 'node:path'
import { expect, it } from 'vitest'
import { slidevArgs } from './slidev.ts'
import { downloadUrl, listDeckSlugs, repoRoot } from './talks.ts'

it('slidevArgs derives base, output dir and PDF path from the folder name', () => {
  expect(slidevArgs('dev', '01-first')).toEqual([])
  expect(slidevArgs('build', '01-first')).toEqual([
    'build',
    '--base',
    '/lightning-talks/01-first/',
    '--out',
    '../../dist/01-first',
  ])
  expect(slidevArgs('export', '01-first')).toEqual([
    'export',
    '--per-slide',
    '--output',
    '../../dist/01-first/01-first.pdf',
  ])
})

it('downloadUrl points at the PDF published next to the deck on Pages', () => {
  expect(downloadUrl('01-first'))
    .toBe('https://phyberapex.github.io/lightning-talks/01-first/01-first.pdf')
})

it.each(listDeckSlugs(repoRoot))('%s declares the download URL derived from its folder name', (slug) => {
  const slides = fs.readFileSync(path.join(repoRoot, slug, 'src/slides.md'), 'utf8')
  const frontmatter = slides.split('\n---')[0]
  expect(frontmatter.match(/^download: (.*)$/m)?.[1]).toBe(downloadUrl(slug))
})

it.each(listDeckSlugs(repoRoot))('%s does not commit its PDF', (slug) => {
  expect(fs.existsSync(path.join(repoRoot, slug, `${slug}.pdf`))).toBe(false)
})

it.each(listDeckSlugs(repoRoot))('%s/src/package.json does not repeat its folder name', (slug) => {
  const packageJson = fs.readFileSync(path.join(repoRoot, slug, 'src/package.json'), 'utf8')
  expect(packageJson).not.toContain(slug)
})
