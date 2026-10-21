import process from 'node:process'
import prompts from 'prompts'
import { isTalkCommand, runSlidev, TALK_COMMANDS } from './slidev.ts'
import { listDeckSlugs, repoRoot } from './talks.ts'

async function pickFolder(folders: string[], skipPrompt: boolean): Promise<string | undefined> {
  if (skipPrompt)
    return folders[0]
  const { folder } = await prompts({
    type: 'select',
    name: 'folder',
    message: 'Pick a folder',
    choices: folders.map(folder => ({ title: folder, value: folder })),
  })
  return folder
}

async function startPicker(args: string[]) {
  const command = args.find(arg => arg !== '-y')
  if (!isTalkCommand(command)) {
    console.error(`Usage: tsx scripts/picker.ts <${TALK_COMMANDS.join('|')}> [-y]`)
    process.exit(1)
  }

  const newestFirst = listDeckSlugs(repoRoot).reverse()
  const folder = await pickFolder(newestFirst, args.includes('-y'))
  if (folder)
    await runSlidev(command, folder)
}

await startPicker(process.argv.slice(2))
