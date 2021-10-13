import fs from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)

/*
 * Import data files from /questions directory and export
 * as combined module
 */
export default async () => {
  const questions = {}
  const dirPath = dirname(__filename) + '/questions'

  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath)
    for (const file of files) {
      const fileName = file.replace('.js', '')
      const fileData = await import('./questions/' + file)
      questions[fileName] = fileData.default
    }
  }

  return questions
}
