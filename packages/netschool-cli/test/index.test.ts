import { getAssignments } from 'netschool-node'

const { NETSCHOOL_URL, NETSCHOOL_USER, NETSCHOOL_PASSWORD } = process.env

describe('Get Assignments', function() {
  this.timeout(0)

  it('get assignments', async function() {
    const assignments = await getAssignments({
      url: NETSCHOOL_URL!,
      user: NETSCHOOL_USER!,
      password: NETSCHOOL_PASSWORD!,
      weeks: ['03.09.18', '10.09.18', '17.09.18', '24.09.18']
    })

    console.log(assignments)
  })
})
