import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ExpenseItem} from '../../models/ExpenseItem';
import {ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {BillRegistryService} from '../bill-registry.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';
import {LoaderDialogComponent} from '../loader-dialog/loader-dialog.component';
import {BillItem} from '../../models/BillItem';
import {BillScanningComponent} from '../bill-scanning/bill-scanning.component';
import { DomSanitizer } from '@angular/platform-browser';
import {ImageEnlargeComponent} from '../image-enlarge/image-enlarge.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpenseComponent implements OnInit {

  private Expense: ExpenseItem = new ExpenseItem();
  private expenseId: number;
  private pageTitle: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private brService: BillRegistryService,
              public dialog: MatDialog,
              public sanitizer: DomSanitizer) {
    this.Expense.Bill = new BillItem();

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
          dialogRef.afterClosed().subscribe(() => {
            this.dialog.open(MessageDialogComponent, <MatDialogConfig>{
              disableClose: true,
              data: {
                title: 'Operation failed',
                message: error,
                type: 'error'
              }
            });
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

    let dialogRef = this.dialog.open(LoaderDialogComponent, <MatDialogConfig>{
      disableClose: true
    });

    this.brService.sendExpense(this.Expense).then((data) => {
      dialogRef.close();
      this.router.navigate(['/expenses']);
    }, (error) => {
      dialogRef.close();
      dialogRef.afterClosed().subscribe(() => {
        dialogRef = this.dialog.open(MessageDialogComponent, <MatDialogConfig>{
          disableClose: true,
          data: {
            title: 'Operation failed',
            message: error,
            type: 'error'
          }
        });
      });
    });
  }

  scan() {

    const me = this;

    const ref = this.dialog.open(BillScanningComponent, <MatDialogConfig>{
      disableClose: true
    });

    ref.afterClosed().subscribe(billData => {
      if (billData) {
        me.Expense.Bill.BillData = billData.src;
        me.Expense.Bill.MimeType = billData.mimeType;
      }
    });
  }

  enlarge() {
    this.dialog.open(ImageEnlargeComponent, <MatDialogConfig>{
      panelClass: 'full-screen-dialog',
      data: {
        imgSrc: this.Expense.Bill.BillData
      }
    });
  }

}
