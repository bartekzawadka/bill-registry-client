import { Component, OnInit } from '@angular/core';
import {BillRegistryService} from '../bill-registry.service';
import {LoaderDialogComponent} from '../loader-dialog/loader-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  private pageIndex = 0;
  private pageSize = 50;

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
    }, (error) => {
      dialogRef.close();
    });
  }

}
