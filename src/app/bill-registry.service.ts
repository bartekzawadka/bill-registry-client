import {Injectable} from '@angular/core';
import {Http, RequestOptions, RequestOptionsArgs, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
import {ExpensesDataSet} from '../models/ExpensesDataSet';
import {ExpenseItem} from '../models/ExpenseItem';
import {BillItem} from '../models/BillItem';
import {FileResult} from '../models/FileResult';
import {ExpensesFilter} from '../models/ExpensesFilter';
import { environment } from '../environments/environment';

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

  private static appendToForm(form: FormData, name: string, item: any) {
    if (item) {
      form.append(name, item.toString());
    }

    return form;
  }

  getExpense(id) {
    return new Promise<ExpenseItem>((resolve, reject) => {
      this.http.get(environment.brServiceUrl + '/api/expense/' + id).map((res) => res.json()).subscribe((data) => {

        const dataSet = new ExpenseItem();
        dataSet.Id = data._id;
        dataSet.Name = data.name;
        dataSet.Description = data.description;
        dataSet.Amount = data.amount;
        dataSet.CreatedAtDate = data.created;
        dataSet.Thumbnail = data.thumbnail;

        const bill = new BillItem();
        bill.Id = data.bill;

        if (data.billFile) {
          bill.BillFile = {
            name: data.billFile.name,
            size: data.billFile.size,
            type: data.mimeType
          };
        }

        dataSet.Bill = bill;

        resolve(dataSet);
      }, (error) => {
        BillRegistryService.handleError(error, reject);
      });
    });
  }

  getExpenses(filter: ExpensesFilter,
              pageIndex: number = 0,
              pageSize: number = 50,
              sortBy: string = 'created',
              orderBy: string = 'descending') {
    return new Promise<ExpensesDataSet>((resolve, reject) => {

      let uri = environment.brServiceUrl + '/api/expenses?skip=' +
        pageIndex + '&limit=' + pageSize;
      if (filter) {
        if (filter.SearchPhrase) {
          uri += '&searchString=' + filter.SearchPhrase;
        }
        if (filter.DateFrom) {
          uri += '&createdFrom=' + filter.DateFrom;
        }
        if (filter.DateTo) {
          uri += '&createdTo=' + filter.DateTo;
        }
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

      // const body = {
      //   id: expense.Id,
      //   name: expense.Name,
      //   description: expense.Description,
      //   amount: expense.Amount.toString(),
      //   billId: expense.Bill.Id,
      //   billData: expense.Bill.BillData,
      //   billMimeType: expense.Bill.MimeType
      // };

      let formData = new FormData();
      formData = BillRegistryService.appendToForm(formData, 'id', expense.Id);
      formData = BillRegistryService.appendToForm(formData, 'name', expense.Name);
      formData = BillRegistryService.appendToForm(formData, 'description', expense.Description);
      formData = BillRegistryService.appendToForm(formData, 'amount', expense.Amount);
      formData = BillRegistryService.appendToForm(formData, 'billId', expense.Bill.Id);
      formData = BillRegistryService.appendToForm(formData, 'billData', expense.Bill.BillData);
      formData = BillRegistryService.appendToForm(formData, 'billMimeType', expense.Bill.MimeType);
      formData = BillRegistryService.appendToForm(formData, 'thumbnail', expense.Thumbnail);
      if (expense.Bill && expense.Bill.BillFile) {
        formData.append('file', expense.Bill.BillFile, expense.Bill.BillFile.name);
      }

      const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      const options = new RequestOptions(<RequestOptionsArgs>{headers: headers});

      this.http.post(environment.brServiceUrl + '/api/expense', formData, options).map((res) => res.json()).subscribe((data) => {
        resolve(data);
      }, (error) => {
        BillRegistryService.handleError(error, reject);
      });
    });
  }

  getBill(id) {
    return new Promise<FileResult>((resolve, reject) => {
      this.http.get(environment.brServiceUrl + '/api/bill/' + id, {responseType: ResponseContentType.Blob})
        .subscribe((data) => {
          try {

            if (!data || !data.headers) {
              reject('Response could not be parsed. No headers received');
              return;
            }

            if (!data['_body']) {
              reject('Empty data received');
            }

            const contentType = data.headers.get('content-type');
            const contentDisposition = data.headers.get('content-disposition');

            if (!contentType || !contentDisposition) {
              reject('Response does not contain expected headers. Invalid format');
              return;
            }

            const parts: string[] = contentDisposition.split(';');
            if (!parts || parts.length < 2) {
              reject('Content disposition header has invalid format');
              return;
            }

            const fileNameParts = parts[1].split('=');
            let fName: string;

            if (!fileNameParts || fileNameParts.length < 2) {
              console.warn('Content disposition header does not contain file name');
              fName = 'file';
            } else {
              fName = fileNameParts[1];
            }
            const filename = fName;

            const result = new FileResult();
            result.FileData = new Blob([data['_body']], {type: contentType});
            result.FileName = filename;

            resolve(result);

          } catch (e) {
            reject(e);
          }
        }, (error) => {
          BillRegistryService.handleError(error, reject);
        });
    });
  }
}
