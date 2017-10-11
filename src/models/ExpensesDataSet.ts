export class ExpensesDataSet {
  public Rows: Array<any> = null;
  public TotalCount = 0;
  public PageIndex = 0;
  public PageSize = 50;
  get pageNumber(): number {
    return this.PageIndex + 1;
  }

  constructor(rows: Array<any> = null,
              totalCount: number,
              pageIndex: number,
              pageSize: number) {
    this.Rows = rows;
    this.TotalCount = totalCount;
    this.PageIndex = pageIndex;
    this.PageSize = pageSize;
  }

  setPageSize(size: number) {
    if (size < 0) {
      size = 1;
    }

    this.PageSize = size;
  }
}
