import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BillRegistryService {

  constructor(private http: Http) {
  }

  getExpenses(pageIndex: number = 0, pageSize: number = 50) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3030/api/expenses?skip=' +
        pageIndex + '&limit=' + pageSize).map((res) => res.json()).subscribe((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
}
