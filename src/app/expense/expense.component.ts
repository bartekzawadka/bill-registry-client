import {Component, OnInit, ViewEncapsulation, EventEmitter} from '@angular/core';
import {ExpenseItem} from '../../models/ExpenseItem';
import {ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {BillRegistryService} from '../bill-registry.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';
import {LoaderDialogComponent} from '../loader-dialog/loader-dialog.component';
import {BillItem} from '../../models/BillItem';
import {BillAcquisitionComponent} from '../bill-acquisition/bill-acquisition.component';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageEnlargeComponent} from '../image-enlarge/image-enlarge.component';
import {saveAs} from 'file-saver/FileSaver';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpenseComponent implements OnInit {

  Expense: ExpenseItem = new ExpenseItem();
  pageTitle: string;

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

    const ref = this.dialog.open(BillAcquisitionComponent, <MatDialogConfig>{
      panelClass: 'half-screen-dialog',
      disableClose: true
    });

    ref.afterClosed().subscribe(billData => {
      if (billData) {
        if (billData.FileData && billData.FileData.length > 0) {
          me.Expense.Bill.BillData = null;
          me.Expense.Bill.BillFile = billData.FileData[0];
          me.Expense.Bill.MimeType = billData.FileData[0].type;
        } else if (billData.ScannedImage) {
          me.Expense.Bill.BillFile = null;
          me.Expense.Bill.BillData = billData.ScannedImage.src;
          me.Expense.Bill.MimeType = billData.ScannedImage.mimeType;
        }
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

  downloadBill() {

    this.brService.getBill(this.Expense.Bill.Id).then((data) => {
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
