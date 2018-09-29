import cheerio from 'cheerio'
import moment from 'moment'
import { flatten } from './utils'

type AssignmentMark = 2 | 3 | 4 | 5 | ''

const typeMap: { [key: string]: string } = {
  А: 'Практическая работа',
  В: 'Срезовая работа',
  Д: 'Домашняя работа',
  К: 'Контрольная работа',
  С: 'Самостоятельная работа',
  Л: 'Лабораторная работа',
  П: 'Проект',
  Н: 'Диктант',
  Р: 'Реферат',
  О: 'Ответ на уроке',
  Ч: 'Сочинение',
  И: 'Изложение',
  З: 'Зачёт',
  Т: 'Тестирование'
}

export interface Assignment {
  aid: string
  date: string
  subject: string
  type: string
  topic: string
  mark: AssignmentMark
}

export interface AtVer {
  at: string
  ver: string
}

export function parseAtVer(html: string): AtVer {
  const $ = cheerio.load(html)
  const at = $('input[name="AT"]').val()
  const ver = $('input[name="VER"]').val()
  return {
    at,
    ver
  }
}

export function parseAssignments(html: string): Assignment[] {
  const $ = cheerio.load(html)
  var records = $('table td[rowspan]')
    .toArray()
    .map(
      (td): Assignment[] => {
        const $td = $(td)
        const rows = findTrRecords($td)
        const date = parseDate($td.text().trim())
        return rows.map((row): Assignment => parseTrRecords($, row, date))
      }
    )
  return flatten(records)
}

function findTrRecords($td: Cheerio) {
  const count = parseInt($td.attr('rowspan'))
  return $td
    .parent()
    .toArray()
    .concat(
      $td
        .parent()
        .nextAll('tr')
        .toArray()
        .slice(0, count - 1)
    )
}

function parseTrRecords(
  $: CheerioStatic,
  row: CheerioElement,
  date: string
): Assignment {
  let tdRecords = $(row)
    .children('td')
    .toArray()
  tdRecords = tdRecords.length > 4 ? tdRecords.slice(1, 5) : tdRecords
  const record: any = { date }
  tdRecords.forEach((td, i) => {
    const tdText = $(td).text()
    updateRecord(record, tdText, i)
    if (i == 2) {
      record.aid = $(td)
        .children('a')
        .attr('onclick')
        .match(/\d+/)![0]
    }
  })
  return record
}

function updateRecord(record: any, text: string, index: number) {
  text = normalizeText(text)
  if (index == 0) record.subject = text
  else if (index == 1) record.type = parseType(text)
  else if (index == 2) record.topic = text
  else if (index == 3) record.mark = parseMark(text)
}

function normalizeText(text: string): string {
  return text.replace(/(\r\n|\r|\n|\s+)/g, ' ').trim()
}

function parseMark(val: string): AssignmentMark {
  if (val === '-') return ''
  return parseInt(val) as AssignmentMark
}

function parseDate(val: string): string {
  return moment(val.substr(0, 8), 'DD.MM.YY').format('YYYY-MM-DD')
}

function parseType(val: string): string {
  return typeMap[val]
}
