import { fetchAssignments } from './fetcher'
import { parseAssignments } from './parser'
import { flatten } from './utils'

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
}) {
  const result = await fetchAssignments(url, user, password, weeks)
  return flatten(result.map(html => parseAssignments(html)))
}
