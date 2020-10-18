import fs from 'fs'

const FILE_NAME = 'big-file.o'
const FILE_SIZE = 100 * 1024 // bytes

const NUM_SIZE = Uint32Array.BYTES_PER_ELEMENT
const MAX_NUM = Math.pow(2, 8 * NUM_SIZE)
const COUNT = FILE_SIZE / NUM_SIZE

function* getRandomList(count: number, max = MAX_NUM) {
  for (let i = 0; i < count; i++) {
    yield Math.round(Math.random() * max)
  }
}

fs.writeFile(FILE_NAME, new Uint32Array(getRandomList(COUNT)), (error) => {
  if (error) console.error(error)
  console.log(`file with ${COUNT} numbers`)
  console.log('done')
})

