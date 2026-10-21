import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { expect, it } from 'vitest'
import { readTalks, renderIndexHtml, renderReadme } from './talks.ts'

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
    '02-second': { title: 'Second', date: '2024-08-08', tags: ['TypeScript'] },
    '01-first': { title: 'First', date: '2024-08-01', tags: ['TypeScript', 'Basics'] },
  })

  expect(readTalks(root)).toEqual([
    { slug: '01-first', title: 'First', date: '2024-08-01', tags: ['TypeScript', 'Basics'], link: 'https://phyberapex.github.io/lightning-talks/01-first/' },
    { slug: '02-second', title: 'Second', date: '2024-08-08', tags: ['TypeScript'], link: 'https://phyberapex.github.io/lightning-talks/02-second/' },
  ])
})

it('readTalks rejects a talk.json with missing or malformed fields, naming the folder', () => {
  const root = tempRepo({
    '01-no-tags': { title: 'No tags', date: '2024-08-01' },
  })
  expect(() => readTalks(root)).toThrow(/01-no-tags[\s\S]*tags/)

  const badDate = tempRepo({
    '01-bad-date': { title: 'Bad date', date: 'August 1st', tags: [] },
  })
  expect(() => readTalks(badDate)).toThrow(/01-bad-date[\s\S]*date/)
})

it('readTalks fails when a deck folder has no talk.json', () => {
  const root = tempRepo({ '01-missing': undefined })
  expect(() => readTalks(root)).toThrow(/01-missing/)
})

const talks = [
  { slug: '01-first', title: 'First', date: '2024-08-01', tags: ['TypeScript', 'Basics'], link: 'https://example.test/01-first/' },
  { slug: '02-second', title: 'Second | Part 2', date: '2024-08-08', tags: [], link: 'https://example.test/02-second/' },
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

it('renderReadme refuses a README without markers', () => {
  expect(() => renderReadme('# No markers', talks)).toThrow(/talks:start/)
})

it('renderIndexHtml fills the template with one escaped card per talk', () => {
  const template = '<main>\n{{TALKS}}\n</main>'
  const html = renderIndexHtml(template, [
    { slug: '14-claw', title: 'Claw & Order <3', date: '2026-02-13', tags: ['Automation', 'AI'], link: 'https://example.test/14-claw/' },
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
