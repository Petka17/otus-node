jest.mock('path', () => {
  return {
    resolve: () => '/Users/user1/root',
  }
})

jest.mock('../constructFolderTree.js', () => {
  const testData = require('../__test-data__/testDirTree.js')

  return {
    constructFolderTree: () => Promise.resolve(testData),
  }
})

const flushPromises = () => new Promise(setImmediate)

test('returns a tree', async (done) => {
  const consoleLogSpy = jest.spyOn(console, 'log')

  require('../tree')

  await flushPromises()

  expect(consoleLogSpy.mock.calls[0][0]).toMatchSnapshot()

  consoleLogSpy.mockRestore()
  done()
})

// test('show help if -h argument is present', async (done) => {
//   process.argv.push('-h')
//   process.exit = jest.fn(() => {})

//   console.log(process.argv)

//   const consoleLogSpy = jest.spyOn(console, 'log')

//   require('../tree')

//   await flushPromises()

//   expect(process.exit).toHaveBeenCalledWith(1)
//   expect(consoleLogSpy.mock.calls).toBe(1)

//   consoleLogSpy.mockRestore()
//   provess.exit.mockRestore()

//   done()
// })
