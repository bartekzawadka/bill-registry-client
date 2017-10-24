import {BillItem} from './BillItem';

export class ExpenseItem {

  public Id: string;
  public Name: string;
  public Description: string;
  public Amount = 0;
  public Bill: BillItem;
  public CreatedAtDate: Date;
  public Thumbnail: any;

  constructor() {
  }
}
