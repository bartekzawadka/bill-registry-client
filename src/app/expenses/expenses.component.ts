import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BillRegistryService} from '../bill-registry.service';
import {LoaderDialogComponent} from '../loader-dialog/loader-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';
import {ExpensesDataSet} from '../../models/ExpensesDataSet';
import {ExpensesFilter} from '../../models/ExpensesFilter';
import {saveAs} from 'file-saver/FileSaver';
import 'rxjs/add/operator/map';
import {Globals} from '../globals';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  expenses: ExpensesDataSet = new ExpensesDataSet(null, 0, 0, 50);
  sort = {
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

    this.brService.getExpenses(this.globals.expensesFilter,
      this.expenses.PageIndex,
      this.expenses.PageSize,
      this.sort.sortValue,
      this.sort.sortDirection)
      .then((data) => {
        this.expenses = data;
        dialogRef.close();
      }, (error) => {
        dialogRef.close();
        dialogRef.afterClosed().subscribe(() => {
          this.dialog.open(MessageDialogComponent, <MatDialogConfig>{
            disableClose: true,
            data: {
              title: 'Error',
              message: error,
              type: 'error'
            }
          });
        });
      });

  }

  clearFilter() {
    this.globals.expensesFilter = new ExpensesFilter();
    this.getData();
  }

  pageChanged(pageEvent) {
    this.expenses.PageIndex = pageEvent.pageIndex;
    this.expenses.PageSize = pageEvent.pageSize;
    this.getData();
  }

  getIcon(mimeType) {
    switch (mimeType) {
      default:
        return 'insert_drive_file';
      case 'image/png':
      case 'image/jpeg':
        return 'photo';
      case 'application/pdf':
        return 'picture_as_pdf';
    }
  }

  downloadBill(id) {

    this.brService.getBill(id).then((data) => {
      try {
        saveAs(data.FileData, data.FileName);
      } catch (e) {

        const error = 'Unable to process data from server: ' + e;

        this.dialog.open(MessageDialogComponent, <MatDialogConfig>{
          disableClose: true,
          data: {
            title: 'Operation failed',
            message: error,
            type: 'error'
          }
        });
      }
    }, (error) => {
      this.dialog.open(MessageDialogComponent, <MatDialogConfig>{
        disableClose: true,
        data: {
          title: 'Operation failed',
          message: error,
          type: 'error'
        }
      });
    });
  }
}
