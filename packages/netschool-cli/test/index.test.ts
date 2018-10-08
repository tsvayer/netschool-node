import { login, logout, getAssignments } from 'netschool-node'

const { NETSCHOOL_URL, NETSCHOOL_USER, NETSCHOOL_PASSWORD } = process.env

describe('Get Assignments', function() {
  this.timeout(0)

  it('get assignments', async function() {
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

    console.log(assignments)
  })
})
