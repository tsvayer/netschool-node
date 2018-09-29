import fs from 'fs'
import { parseAssignments } from '../src/parser'

describe('Parser', () => {
  it('should parse addignments html', () => {
    const html = fs.readFileSync(`${__dirname}/parser.test.htm`).toString()
    const records = parseAssignments(html)

    //TODO: add assertions
    console.log(records)
  })
})
