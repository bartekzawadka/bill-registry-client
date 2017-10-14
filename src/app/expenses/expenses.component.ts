import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BillRegistryService} from '../bill-registry.service';
import {LoaderDialogComponent} from '../loader-dialog/loader-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';
import {ExpensesDataSet} from '../../models/ExpensesDataSet';
import 'rxjs/add/operator/map';
import {Globals} from '../globals';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  private expenses: ExpensesDataSet = new ExpensesDataSet(null, 0, 0, 50);
  private sort = {
    sortOptions: [{
      title: 'Name',
      value: 'name'
    }, {
      title: 'Date of creation',
      value: 'created'
    }, {
      title: 'Amount',
      value: 'amount'
    }],
    sortDirections: [{
      title: 'Ascending',
      value: 'ascending'
    }, {
      title: 'Descending',
      value: 'descending'
    }],
    sortValue: 'created',
    sortDirection: 'descending'
  };

  pageSizeOptions = [5, 10, 25, 50, 100];

  constructor(private brService: BillRegistryService,
              public dialog: MatDialog,
              public globals: Globals) {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    const dialogRef = this.dialog.open(LoaderDialogComponent, <MatDialogConfig>{
      disableClose: true
    });

    this.brService.getExpenses(this.globals.searchPhrase,
      this.expenses.PageIndex,
      this.expenses.PageSize,
      this.sort.sortValue,
      this.sort.sortDirection)
      .then((data) => {
      this.expenses = data;
      dialogRef.close();
    }, (error) => {
      dialogRef.close();

      this.dialog.open(MessageDialogComponent, <MatDialogConfig>{
        disableClose: true,
        data: {
          title: 'Error',
          message: error,
          type: 'error'
        }
      });
    });

  }

  pageChanged(pageEvent) {
    this.expenses.PageIndex = pageEvent.pageIndex;
    this.expenses.PageSize = pageEvent.pageSize;
    this.getData();
  }

}
