#!/usr/bin/env node

import path from 'path'

import { constructFolderTree } from './constructFolderTree.js'
import { stringifyTree } from './stringifyTree.js'

const [, , ...argv] = process.argv

console.trace(argv, process.argv)
if (['-h', '--help'].includes(argv[0]) || (argv.length === 2 && argv[0] !== '-d')) {
  console.log('usage: tree [-d folder]')
  process.exit(1)
}

const fullPath = path.resolve(argv[1] ?? '.')

constructFolderTree(fullPath)
  .then(stringifyTree)
  .then(console.log)
  .catch(() => {
    console.error(error)
    process.exit(1)
  })
