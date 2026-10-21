import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE_URL = 'https://phyberapex.github.io/lightning-talks/'

export const repoRoot = fileURLToPath(new URL('..', import.meta.url))

export interface Talk {
  slug: string
  title: string
  date: string
  tags: string[]
  link: string
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function parseTalkMeta(slug: string, raw: unknown): Omit<Talk, 'slug' | 'link'> {
  const fail = (reason: string): never => {
    throw new Error(`${slug}/talk.json: ${reason}`)
  }
  if (typeof raw !== 'object' || raw === null)
    return fail('expected an object')
  const { title, date, tags } = raw as Record<string, unknown>
  if (typeof title !== 'string' || title.trim() === '')
    return fail('"title" must be a non-empty string')
  if (typeof date !== 'string' || !ISO_DATE.test(date))
    return fail('"date" must be formatted as YYYY-MM-DD')
  if (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string'))
    return fail('"tags" must be an array of strings')
  return { title, date, tags }
}

export function listDeckSlugs(rootDir: string): string[] {
  return fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && /^\d{2}-/.test(dirent.name))
    .map(dirent => dirent.name)
    .sort()
}

export function readTalks(rootDir: string): Talk[] {
  return listDeckSlugs(rootDir)
    .map((slug) => {
      const raw = JSON.parse(fs.readFileSync(path.join(rootDir, slug, 'talk.json'), 'utf8'))
      return { slug, ...parseTalkMeta(slug, raw), link: `${SITE_URL}${slug}/` }
    })
}

const TALKS_START = '<!-- talks:start -->'
const TALKS_END = '<!-- talks:end -->'

function escapeTableCell(text: string) {
  return text.replace(/\|/g, '\\|')
}

function renderTalksTable(talks: Talk[]) {
  const header = ['Topic', 'Date', 'Live', 'Tags']
  const rows = talks.map(talk => [
    escapeTableCell(talk.title),
    talk.date,
    `[Live](${talk.link})`,
    escapeTableCell(talk.tags.join(', ')),
  ])
  const widths = header.map((cell, column) =>
    Math.max(cell.length, ...rows.map(row => row[column].length)))
  const renderRow = (cells: string[]) =>
    `| ${cells.map((cell, column) => cell.padEnd(widths[column])).join(' | ')} |`
  const separator = `|${widths.map(width => '-'.repeat(width + 2)).join('|')}|`
  return [renderRow(header), separator, ...rows.map(renderRow)].join('\n')
}

export function renderReadme(readme: string, talks: Talk[]) {
  const start = readme.indexOf(TALKS_START)
  const end = readme.indexOf(TALKS_END)
  if (start === -1 || end === -1 || end < start)
    throw new Error(`README must contain ${TALKS_START} followed by ${TALKS_END}`)
  const before = readme.slice(0, start + TALKS_START.length)
  const after = readme.slice(end)
  return `${before}\n${renderTalksTable(talks)}\n${after}`
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function renderTalkCard(talk: Talk) {
  const tags = talk.tags.map(tag => `<span class="talk-tag">${escapeHtml(tag)}</span>`).join('')
  return `
            <div class="talk-card">
                <h2 class="talk-title">${escapeHtml(talk.title)}</h2>
                <div class="talk-date">${formatDate(talk.date)}</div>
                <div class="talk-tags">${tags}</div>
                <a href="${escapeHtml(talk.link)}" class="view-talk">View Talk</a>
            </div>`
}

export function renderIndexHtml(template: string, talks: Talk[]) {
  return template.replace('{{TALKS}}', talks.map(renderTalkCard).join('\n'))
}
