import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { expect, it } from 'vitest'
import { listDeckSlugs, readTalks, renderIndexHtml, renderReadme, renderTalkReadme } from './talks.ts'

function tempRepo(decks: Record<string, unknown>) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'talks-'))
  for (const [folder, meta] of Object.entries(decks)) {
    fs.mkdirSync(path.join(root, folder))
    if (meta !== undefined)
      fs.writeFileSync(path.join(root, folder, 'talk.json'), JSON.stringify(meta))
  }
  return root
}

it('readTalks collects talk.json from NN-* folders in order', () => {
  const root = tempRepo({
    '02-second': { title: 'Second', date: '2024-08-08', tags: ['TypeScript'], abstract: 'About the second.' },
    '01-first': { title: 'First', date: '2024-08-01', tags: ['TypeScript', 'Basics'], abstract: 'About the first.' },
  })

  expect(readTalks(root)).toEqual([
    {
      slug: '01-first',
      title: 'First',
      date: '2024-08-01',
      tags: ['TypeScript', 'Basics'],
      abstract: 'About the first.',
      link: 'https://phyberapex.github.io/lightning-talks/01-first/',
      pdf: 'https://phyberapex.github.io/lightning-talks/01-first/01-first.pdf',
    },
    {
      slug: '02-second',
      title: 'Second',
      date: '2024-08-08',
      tags: ['TypeScript'],
      abstract: 'About the second.',
      link: 'https://phyberapex.github.io/lightning-talks/02-second/',
      pdf: 'https://phyberapex.github.io/lightning-talks/02-second/02-second.pdf',
    },
  ])
})

it('readTalks rejects a talk.json with missing or malformed fields, naming the folder', () => {
  const root = tempRepo({
    '01-no-tags': { title: 'No tags', date: '2024-08-01', abstract: 'x' },
  })
  expect(() => readTalks(root)).toThrow(/01-no-tags[\s\S]*tags/)

  const badDate = tempRepo({
    '01-bad-date': { title: 'Bad date', date: 'August 1st', tags: [], abstract: 'x' },
  })
  expect(() => readTalks(badDate)).toThrow(/01-bad-date[\s\S]*date/)

  const blankAbstract = tempRepo({
    '01-blank-abstract': { title: 'Blank', date: '2024-08-01', tags: [], abstract: '  ' },
  })
  expect(() => readTalks(blankAbstract)).toThrow(/01-blank-abstract[\s\S]*abstract/)
})

it('readTalks fails when a deck folder has no talk.json', () => {
  const root = tempRepo({ '01-missing': undefined })
  expect(() => readTalks(root)).toThrow(/01-missing/)
})

const talks = [
  { slug: '01-first', title: 'First', date: '2024-08-01', tags: ['TypeScript', 'Basics'], abstract: 'About the first.', link: 'https://example.test/01-first/', pdf: 'https://example.test/01-first/01-first.pdf' },
  { slug: '02-second', title: 'Second | Part 2', date: '2024-08-08', tags: [], abstract: 'About the second.', link: 'https://example.test/02-second/', pdf: 'https://example.test/02-second/02-second.pdf' },
]

it('renderReadme replaces everything between the talks markers with the table', () => {
  const readme = [
    '# Lightning Talks',
    '',
    '<!-- talks:start -->',
    '| stale | table |',
    '<!-- talks:end -->',
    '',
    'Footer',
  ].join('\n')

  expect(renderReadme(readme, talks)).toBe([
    '# Lightning Talks',
    '',
    '<!-- talks:start -->',
    '| Topic            | Date       | Live                                    | Tags               |',
    '|------------------|------------|-----------------------------------------|--------------------|',
    '| First            | 2024-08-01 | [Live](https://example.test/01-first/)  | TypeScript, Basics |',
    '| Second \\| Part 2 | 2024-08-08 | [Live](https://example.test/02-second/) |                    |',
    '<!-- talks:end -->',
    '',
    'Footer',
  ].join('\n'))
})

it('renderTalkReadme writes title, abstract, date, tags and links for one talk', () => {
  expect(renderTalkReadme(talks[0])).toBe([
    '<!-- Generated from talk.json by `pnpm run readme`. Edit talk.json instead of this file. -->',
    '# First',
    '',
    'About the first.',
    '',
    '- **Date:** 2024-08-01',
    '- **Tags:** TypeScript, Basics',
    '- **Live:** https://example.test/01-first/',
    '- **PDF:** https://example.test/01-first/01-first.pdf',
    '',
  ].join('\n'))
})

it('renderTalkReadme omits the tags line for a talk without tags', () => {
  expect(renderTalkReadme(talks[1])).not.toContain('Tags')
})

it('renderReadme refuses a README without markers', () => {
  expect(() => renderReadme('# No markers', talks)).toThrow(/talks:start/)
})

it('renderIndexHtml fills the template with one escaped card per talk', () => {
  const template = '<main>\n{{TALKS}}\n</main>'
  const html = renderIndexHtml(template, [
    { slug: '14-claw', title: 'Claw & Order <3', date: '2026-02-13', tags: ['Automation', 'AI'], abstract: 'Lobsters.', link: 'https://example.test/14-claw/', pdf: 'https://example.test/14-claw/14-claw.pdf' },
  ])

  expect(html).toBe(`<main>

            <div class="talk-card">
                <h2 class="talk-title">Claw &amp; Order &lt;3</h2>
                <div class="talk-date">February 13, 2026</div>
                <div class="talk-tags"><span class="talk-tag">Automation</span><span class="talk-tag">AI</span></div>
                <a href="https://example.test/14-claw/" class="view-talk">View Talk</a>
            </div>
</main>`)
})

it('listDeckSlugs returns NN-* folders sorted ascending and ignores everything else', () => {
  const root = tempRepo({
    '02-second': { title: 'Second', date: '2024-08-08', tags: [], abstract: 'x' },
    '01-first': { title: 'First', date: '2024-08-01', tags: [], abstract: 'x' },
    'scripts': undefined,
  })
  expect(listDeckSlugs(root)).toEqual(['01-first', '02-second'])
})
