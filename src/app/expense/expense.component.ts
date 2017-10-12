import {Component, OnInit} from '@angular/core';
import {ExpenseItem} from '../../models/ExpenseItem';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {BillRegistryService} from '../bill-registry.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';
import {LoaderDialogComponent} from '../loader-dialog/loader-dialog.component';
import {BillItem} from '../../models/BillItem';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  private Expense: ExpenseItem = new ExpenseItem();
  private expenseId: number;
  private pageTitle: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private brService: BillRegistryService,
              public dialog: MatDialog) {
    this.Expense.Bill = new BillItem();
    this.Expense.Bill.BillData = 'TEST BILL DATA';

    this.route.params.subscribe((p: Params) => {
      if (p && p['id']) {

        this.pageTitle = 'Edit expense: ';

        const dialogRef = this.dialog.open(LoaderDialogComponent, <MatDialogConfig>{
          disableClose: true
        });

        this.brService.getExpense(p['id']).then(data => {
          this.Expense = data;
          dialogRef.close();
        }).catch((error) => {
          dialogRef.close();
          this.dialog.open(MessageDialogComponent, <MatDialogConfig>{
            disableClose: true,
            data: {
              title: 'Operation failed',
              message: error,
              type: 'error'
            }
          });
        });
      } else {
        this.pageTitle = 'Create new expense';
      }
    });
  }

  ngOnInit() {
  }

  submit() {

    const dialogRef = this.dialog.open(LoaderDialogComponent, <MatDialogConfig>{
      disableClose: true
    });

    this.brService.sendExpense(this.Expense).then((data) => {
      dialogRef.close();
      this.router.navigate(['/expenses']);
    }, (error) => {
      dialogRef.close();
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
