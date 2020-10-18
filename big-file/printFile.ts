import fs from 'fs'

// const FILE_NAME = 'big-file.o'
const FILE_NAME = '/var/folders/kr/g82cr1tx7klb3sw_qv0xv1h00000gn/T/sortfile_XFZsNt/2'

const NUM_SIZE = Uint32Array.BYTES_PER_ELEMENT

function* getData(buf: Buffer, limit = Infinity) {
  const length = buf.length / NUM_SIZE
  const till = Math.min(length, limit)

  for (let i = 0; i < till; i++) {
    yield buf.readUInt32LE(i * NUM_SIZE)
  }
}

const CHUNK_SIZE = 20

const main = async () => {
  const bigFileStream = fs.createReadStream(FILE_NAME, {
    highWaterMark: NUM_SIZE,
    start: 0,
    end: NUM_SIZE * CHUNK_SIZE - 1,
  })

  for await (const buf of bigFileStream) {
    if (buf instanceof Buffer) {
      for (const v of getData(buf)) {
        console.log(v)
      }
    }
  }
}

main().catch(console.error)

