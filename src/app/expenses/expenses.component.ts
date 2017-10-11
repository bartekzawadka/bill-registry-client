import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BillRegistryService} from '../bill-registry.service';
import {LoaderDialogComponent} from '../loader-dialog/loader-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';
import {ExpensesDataSet} from '../../models/ExpensesDataSet';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  private expenses: ExpensesDataSet = new ExpensesDataSet(null, 0, 0, 50);

  constructor(private brService: BillRegistryService,
              public dialog: MatDialog) {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    const dialogRef = this.dialog.open(LoaderDialogComponent, <MatDialogConfig>{
      disableClose: true
    });

    this.brService.getExpenses(this.expenses.PageIndex, this.expenses.PageSize).then((data) => {
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

}
