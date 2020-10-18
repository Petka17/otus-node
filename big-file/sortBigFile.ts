import fs from 'fs'
import os from 'os'
import path from 'path'
import profiler from 'v8-profiler'

const FILE_NAME = 'big-file.o'

const NUM_SIZE = Uint32Array.BYTES_PER_ELEMENT
const MEMORY_LIMIT = 50 * 1024 // bytes

function* getData(buf: Buffer) {
  const till = buf.length / NUM_SIZE

  for (let i = 0; i < till; i++) {
    yield buf.readUInt32LE(i * NUM_SIZE)
  }
}

const writeFile = (path: string, data: Uint32Array) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) return reject(error)
      resolve()
    })
  })

const main = async () => {
  const bigFileStream = fs.createReadStream(FILE_NAME, {
    highWaterMark: MEMORY_LIMIT,
  })

  const fileName = []
  const tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'sortfile_'))

  for await (const buf of bigFileStream) {
    if (!(buf instanceof Buffer)) return

    const data = new Uint32Array(getData(buf))
    data.sort()

    const tempFile = path.join(tempDir, `${fileName.length + 1}`)

    console.log(tempFile)
    await writeFile(tempFile, data)

    fileName.push(tempFile)
  }
}

main().catch(console.error)

