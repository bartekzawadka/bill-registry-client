import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BillRegistryService} from '../bill-registry.service';
import {LoaderDialogComponent} from '../loader-dialog/loader-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  private pageIndex = 0;
  private pageSize = 50;

  private expenses: any;

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

    this.brService.getExpenses(this.pageIndex, this.pageSize).then((data) => {
      dialogRef.close();
      console.log(data);
      this.expenses = data;

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
