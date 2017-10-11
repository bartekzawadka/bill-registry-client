import {Component, OnInit, Output} from '@angular/core';
import { Location } from '@angular/common';
import {ExpenseItem} from '../../models/ExpenseItem';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {BillRegistryService} from '../bill-registry.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';
import {LoaderDialogComponent} from '../loader-dialog/loader-dialog.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  private Expense: ExpenseItem = new ExpenseItem();
  private expenseId: number;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private brService: BillRegistryService,
              public dialog: MatDialog) {
    this.Expense.BillData = 'TEST BILL DATA';

    this.route.params.subscribe((p: Params) => {
      if (p && p['id']) {
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
      }
    });
  }

  ngOnInit() {



    // this.route.params.switchMap((params: Params) => {
    //   console.log(params);
    //   return this.brService.getExpense(params['id']);
    // })
    //   .subscribe(exp => this.Expense = exp);

    // this.route.paramMap.switchMap((params: ParamMap) => {
    //   this.expenseId = +params.get('id');
    //
    //   console.log(this.expenseId);
    //
    //   if (!this.expenseId) {
    //     alert('THERE IS ID!! :D');
    //   }
    //
    //   return this.route.paramMap;
    // });

    // this.route.params.subscribe(p => {
    //   let id =
    // });
    //
    // console.log(this.route.params);
    // // console.log(this.route.paramMapget('id'));
    //this.Expense.BillData = 'TEST BILL DATA';
  }

  goBack() {
    this.location.back();
  }

  submit() {

    const dialogRef = this.dialog.open(LoaderDialogComponent, <MatDialogConfig>{
      disableClose: true
    });

    this.brService.sendExpense(this.Expense).then((data) => {
      dialogRef.close();
      this.location.back();
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
