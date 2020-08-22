import { promises as fs } from 'fs'
import path from 'path'

export const constructFolderTree = async (fullPath) => {
  const childrenList = await fs.readdir(fullPath)

  const items = await processChildren(childrenList, fullPath)

  return { name: `${path.basename(fullPath)}`, items }
}

const processChildren = async (childrenList, parentPath) =>
  Promise.all(
    childrenList.map(async (name) => {
      const folder = path.join(parentPath, name)
      const isDirectory = (await fs.lstat(folder)).isDirectory()

      if (!isDirectory) return { name }

      const childrenList = await fs.readdir(folder)
      const items = await processChildren(childrenList, folder)

      return { name: `${name}/`, items }
    }),
  )
