import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ExpensesDataSet} from '../models/ExpensesDataSet';
import {ExpenseItem} from '../models/ExpenseItem';
import {BillItem} from '../models/BillItem';

@Injectable()
export class BillRegistryService {

  constructor(private http: Http) {
  }

  private static handleError(error: any, reject: (any) => void) {
    if (error && error.error) {
      reject(error.error);
    } else if (error && error.statusText) {
      reject(error.statusText);
    } else {
      reject(error);
    }
  }

  getExpense(id) {
    return new Promise<ExpenseItem>((resolve, reject) => {
      this.http.get('http://localhost:3030/api/expense/' + id).map((res) => res.json()).subscribe((data) => {

        const dataSet = new ExpenseItem();
        dataSet.Id = data._id;
        dataSet.Name = data.name;
        dataSet.Description = data.description;
        dataSet.Amount = data.amount;
        dataSet.CreatedAtDate = data.created;
        if (data.bill) {
          const bill = new BillItem();
          bill.Id = data.bill._id;
          bill.BillData = data.bill.billData;

          dataSet.Bill = bill;
        }

        resolve(dataSet);
      }, (error) => {
        BillRegistryService.handleError(error, reject);
      });
    });
  }

  getExpenses(searchPhrase: string,
              pageIndex: number = 0,
              pageSize: number = 50,
              sortBy: string = 'created',
              orderBy: string = 'descending') {
    return new Promise<ExpensesDataSet>((resolve, reject) => {

      let uri = 'http://localhost:3030/api/expenses?skip=' +
        pageIndex + '&limit=' + pageSize;
      if (searchPhrase) {
        uri += '&searchString=' + searchPhrase;
      }
      uri += '&sortField=' + sortBy + '&orderBy=' + orderBy;

      this.http.get(uri).map((res) => res.json()).subscribe((data) => {

        const dataSet = new ExpensesDataSet(data.rows, data.count, pageIndex, pageSize);

        resolve(dataSet);
      }, (error) => {
        BillRegistryService.handleError(error, reject);
      });
    });
  }

  sendExpense(expense: ExpenseItem) {
    return new Promise((resolve, reject) => {

      const body = {
        id: expense.Id,
        name: expense.Name,
        description: expense.Description,
        amount: expense.Amount,
        bill: {
          id: expense.Bill.Id,
          billData: expense.Bill.BillData
        }
      };

      this.http.post('http://localhost:3030/api/expense', body).map((res) => res.json()).subscribe((data) => {
        resolve(data);
      }, (error) => {
        BillRegistryService.handleError(error, reject);
      });
    });
  }
}
