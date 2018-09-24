import { Md5 } from 'ts-md5/dist/md5'

export function flatten<T>(items: T[][]): T[] {
  return ([] as T[]).concat(...items)
}

export function md5(data: string): string {
  return Md5.hashStr(data) as string
}
