import {Injectable} from '@angular/core';
import {ExpensesFilter} from '../models/ExpensesFilter';

@Injectable()
export class Globals {
  public expensesFilter = new ExpensesFilter();
  public scanJsFailDetected = false;
}
