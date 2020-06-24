import { randomInteger } from './random-integer';

export function randomWord(len: number): string {
  const minCharCode = 'a'.charCodeAt(0);
  const maxCharCode = 'z'.charCodeAt(0);
  const charCodes = [...Array(len)].map(_ => randomInteger(minCharCode, maxCharCode))
  return String.fromCharCode(...charCodes);
}
