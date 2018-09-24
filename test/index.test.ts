import { getAssignments } from '../src/index'

describe.skip('Get Assignments', async function() {
  this.timeout(10000) // timeout after 10s

  const assignments = await getAssignments({
    url: process.env.NETSCHOOL_URL,
    user: process.env.NETSCHOOL_USER,
    password: process.env.NETSCHOOL_PASSWORD,
    weeks: ['03.09.18', '10.09.18', '17.09.18', '24.09.18']
  })

  //TODO: add assertions
  console.log(assignments)
})
