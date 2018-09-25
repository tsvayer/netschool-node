import { fetchAssignments } from './fetcher'
import { parseAssignments, Assignment } from './parser'
import { flatten } from './utils'

export { Assignment } from './parser'

export async function getAssignments({
  url,
  user,
  password,
  weeks
}: {
  url: string
  user: string
  password: string
  weeks: string[]
}): Promise<Assignment[]> {
  const result = await fetchAssignments(url, user, password, weeks)
  return flatten(result.map(html => parseAssignments(html)))
}
