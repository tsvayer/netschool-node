import { login, logout, fetchAssignments, Session } from './fetcher'
import { parseAssignments, Assignment } from './parser'
import { flatten } from './utils'

export { Assignment }

export { login, logout, Session }

export async function getAssignments({
  weeks,
  session
}: {
  weeks: string[]
  session: Session
}): Promise<Assignment[]> {
  const result = await fetchAssignments({ weeks, session })
  return flatten(result.map(html => parseAssignments(html)))
}
