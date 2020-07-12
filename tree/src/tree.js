#!/usr/bin/env node

import { promises as fs } from 'fs'
import path from 'path'

import { stringifyTree } from './index.js'

const [, , ...argv] = process.argv

if (
  argv.length > 2 ||
  ['-h', '--help'].includes(argv[0]) ||
  (argv.length > 0 && argv[0] !== '-d')
) {
  console.log('usage: tree [-d folder]')
  process.exit(1)
}

const folder = path.resolve(argv[1] ?? '.')

const main = async () => {
  const childrenList = await fs.readdir(folder)
  const items = await constructFolderTree(folder, childrenList)
  const tree = { name: `${path.basename(folder)}`, items }
  return stringifyTree(tree)
}

const constructFolderTree = (parentPath, childrenList) =>
  Promise.all(
    childrenList.map(async (name) => {
      const folder = path.join(parentPath, name)
      const isDirectory = (await fs.lstat(folder)).isDirectory()

      if (!isDirectory) return { name }

      const childrenList = await fs.readdir(folder)
      const items = await constructFolderTree(folder, childrenList)

      return { name: `${name}/`, items }
    }),
  )

main()
  .then(console.log)
  .catch(() => {
    console.error(error)
    process.exit(1)
  })
