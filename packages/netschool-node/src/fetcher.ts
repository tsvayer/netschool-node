import axios from 'axios'
import qs from 'qs'
import { parseAtVer, AtVer } from './parser'
import { md5 } from './utils'

interface Session {
  baseAddress: string
  user: string
  pw: string
  cookie: string[]
}

const URL_GETDATA = '/webapi/auth/getdata'
const URL_LOGIN = '/asp/postlogin.asp'
const URL_ASSIGNMENTS = '/asp/Curriculum/Assignments.asp'
const URL_LOGOUT = '/asp/logout.asp'

export async function fetchAssignments(
  baseAddress: string,
  user: string,
  password: string,
  weekDates: string[]
) {
  const session: Session = {
    baseAddress,
    user: user,
    pw: password,
    cookie: []
  }

  await get('', session)

  let result = await post(URL_GETDATA, session)

  const loginData = buildLoginRequest(result, session)
  result = await post(URL_LOGIN, session, loginData)

  let atVer = parseAtVer(result)
  const assignments: string[] = []
  //NOTE: these tasks cannot be parallelized,
  // because NetSchool generates new VER values for every response
  // which needs to be used for the next request!
  for (let weekDate of weekDates) {
    result = await post(
      URL_ASSIGNMENTS,
      session,
      buildAssignmentsRequest(atVer, weekDate)
    )
    atVer = parseAtVer(result)
    assignments.push(result)
  }

  await post(URL_LOGOUT, session, { ...atVer })
  return assignments
}

function buildAssignmentsRequest(atVer: AtVer, weekDate: string) {
  return {
    ...atVer,
    LoginType: 0,
    DATE: weekDate,
    PCLID_IUP: '30_0'
    // MenuItem: 0,
    // TabItem: 30,
    // optional: 'optional'
  }
}
function buildLoginRequest(data: any, session: Session): any {
  const pw2 = md5(data.salt + md5(session.pw))
  const pw = pw2.substr(0, session.pw.length)
  return {
    PW2: pw2,
    LoginType: 1,
    ECardID: '',
    CID: 3,
    SID: 87,
    PID: -1,
    CN: 3,
    SFT: 2,
    SCID: 1,
    UN: session.user,
    PW: pw,
    lt: data.lt,
    ver: data.ver
  }
}

async function get(url: string, session: Session) {
  const result = await axios.get(`${session.baseAddress}${url}`)
  updateCookie(session, result.headers['set-cookie'] || [])
  return result.data
}

async function post(url: string, session: Session, data?: any) {
  const result = await axios.post(
    `${session.baseAddress}${url}`,
    qs.stringify(data),
    {
      headers: {
        cookie: session.cookie,
        Referer: `${session.baseAddress}/about.asp?AL=Y`
      }
    }
  )
  updateCookie(session, result.headers['set-cookie'] || [])
  return result.data
}

function updateCookie(session: Session, cookie: string[]) {
  session.cookie = [...session.cookie, ...cookie]
}
