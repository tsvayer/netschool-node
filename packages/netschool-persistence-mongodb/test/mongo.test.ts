import { login, logout, getAssignments } from 'netschool-node'
import { DbContext } from '../src/DbContext'

const {
  NETSCHOOL_MONGODB,
  NETSCHOOL_URL,
  NETSCHOOL_USER,
  NETSCHOOL_PASSWORD
} = process.env

describe('mongo', function() {
  this.timeout(0)
  let ctx: DbContext

  before(function() {
    ctx = new DbContext(NETSCHOOL_MONGODB!)
  })
  after(function() {
    ctx.close()
  })

  it.skip('should save', async function() {
    const session = await login({
      baseAddress: NETSCHOOL_URL!,
      user: NETSCHOOL_USER!,
      password: NETSCHOOL_PASSWORD!
    })
    const assignments = await getAssignments({
      weeks: ['03.09.18', '10.09.18', '17.09.18', '24.09.18', '01.10.18'],
      session
    })

    await logout(session)

    const { Assignment } = ctx.Model

    for (let ass of assignments) {
      console.log(`writing record ${ass.aid}`)
      let assModel = new Assignment(ass)
      assModel = await assModel.save()
    }
    console.log(`total: ${assignments.length}`)
  })

  it.skip('should find', async function() {
    const { Assignment } = ctx.Model

    const docs = await Assignment.find({ subject: 'Геометрия' }).exec()

    console.log(docs)
  })
})
