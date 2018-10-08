import { login, logout, Session, getAssignments } from '../src/index'

const { NETSCHOOL_URL, NETSCHOOL_USER, NETSCHOOL_PASSWORD } = process.env
describe('Get Assignments', function() {
  this.timeout(10000) // timeout after 10s

  it('getch from remote', async function() {
    const session = await login({
      baseAddress: NETSCHOOL_URL!,
      user: NETSCHOOL_USER!,
      password: NETSCHOOL_PASSWORD!
    })

    const assignments = await getAssignments({
      weeks: ['03.09.18', '10.09.18', '17.09.18', '24.09.18'],
      session
    })

    await logout(session)

    //TODO: add assertions
    console.log(assignments)
  })
})
