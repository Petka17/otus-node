import { constructFolderTree } from '../constructFolderTree.js'
import testData from '../__test-data__/testDirTree.js'

jest.mock('path', () => {
  const testData = require('../__test-data__/testDirTree.js')

  return {
    basename: jest.fn(() => testData.name),
    join: jest.fn((...args) => args.join('/')),
  }
})

const mockGetNode = (path, items) => {
  const head = path[0]
  const tail = path.slice(1)

  const item = items.find((item) => item.name === head)

  if (!item) return { name: 'not_correct_path', items: [] }

  if (tail.length === 0) return item

  return mockGetNode(tail, item.items)
}

jest.mock('fs', () => {
  const testData = require('../__test-data__/testDirTree.js')

  const getItems = (folder) =>
    mockGetNode(folder.slice(testData.fullPath.length + 1).split('/'), [testData]).items

  return {
    promises: {
      readdir: jest.fn((folder) => {
        const items = getItems(folder)
        return Promise.resolve(Array.isArray(items) ? items.map((item) => item.name) : [])
      }),
      lstat: jest.fn((folder) => {
        return Promise.resolve({
          isDirectory: () => (getItems(folder) ? true : false),
        })
      }),
    },
  }
})

test('Construct Folder Tree works', async (done) => {
  const strTree = await constructFolderTree(`${testData.fullPath}/${testData.name}`)

  expect(strTree).toMatchSnapshot()

  done()
})
