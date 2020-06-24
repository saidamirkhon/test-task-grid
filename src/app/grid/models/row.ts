export class Row {
  public getId(): number {
    return this.data[this.idField];
  }

  constructor(
    public data: any,
    private idField: string
  ) {
  }
}
