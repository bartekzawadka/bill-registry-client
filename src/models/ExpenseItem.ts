import {BillItem} from './BillItem';

export class ExpenseItem {

  public Id: string;
  public Name: string;
  public Description: string;
  public Amount = 0;
  public CreatedAtDate: Date;
  public Bill: BillItem;
  public ExpenseDate: Date;
  public Thumbnail: any;

  constructor() {
  }
}
