interface Term {
  [key: string]: string;
}

export type ITerm = Term & {
  id: number;
}
