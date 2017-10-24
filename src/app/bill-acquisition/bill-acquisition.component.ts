import {ChangeDetectorRef, Component, Inject, ViewEncapsulation} from '@angular/core';
import {OptionSet} from '../../models/OptionSet';
import {OptionItem} from '../../models/OptionItem';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog} from '@angular/material';
import {DialogResult} from '../../interfaces/dialog-result';
import {BillAcquisitionResult} from '../../models/BillAcquisitionResult';
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';
import {Globals} from '../globals';

declare let scanner;

@Component({
  selector: 'app-bill-scanning',
  templateUrl: './bill-acquisition.component.html',
  styleUrls: ['./bill-acquisition.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BillAcquisitionComponent implements DialogResult<BillAcquisitionResult> {
  Result: BillAcquisitionResult;
  formatsOptions: OptionSet<string>;

  constructor(public dialogRef: MatDialogRef<BillAcquisitionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public ref: ChangeDetectorRef,
              public dialog: MatDialog,
              public globals: Globals) {

    this.Result = new BillAcquisitionResult();
    this.formatsOptions = new OptionSet<string>();
    this.formatsOptions.SelectedValue = 'png';
    this.formatsOptions.Options = [
      new OptionItem('PNG', 'png'),
      new OptionItem('JPEG', 'jpeg'),
      new OptionItem('PDF', 'pdf')
    ];
  }

  private displayCannotConnectToScanJs() {
    this.dialog.open(MessageDialogComponent, <MatDialogConfig>{
      disableClose: true,
      data: {
        title: 'Operation failed',
        message: 'Scanner.Js middleware could not be found',
        type: 'error'
      }
    });
  }

  inputChanged(ev) {
    if (ev.target.files && ev.target.files.length > 0) {
      this.Result.FileData = ev.target.files;
    }
  }

  scan() {

    const me = this;

    const displayImagesOnPage = function (successfull, mesg, response) {
      if (!successfull) {
        console.log('Failed: ' + mesg);
        return;
      }

      if (successfull && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
        console.log('User cancelled');
        return;
      }

      let images = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
      if (images && images.length > 0) {
        me.Result.ScannedImage = images[0];
        me.ref.detectChanges();
      }

      images = scanner.getScannedImages(response, false, true);
      if (images && images.length > 0) {
        const scannedImageDiv = document.getElementById('scannedImage');
        if (scannedImageDiv) {
          scannedImageDiv.innerHTML = '';
        }

        me.Result.Thumbnail = images[0];
        me.ref.detectChanges();

        const img = new Image();
        img.height = 400;
        img.onload = function () {
          document.getElementById('scannedImage').appendChild(img);
        };

        img.src = images[0].src;
      }
    };

    try {

      if (this.globals.scanJsFailDetected) {
        this.displayCannotConnectToScanJs();
        return;
      }

      scanner.scan(displayImagesOnPage, {
        'output_settings': [
          {
            'type': 'return-base64',
            'format': this.formatsOptions.SelectedValue
          },
          {
            'type': 'return-base64-thumbnail',
            'format': 'jpg',
            'thumbnail_height': 400
          }
        ]
      });
    } catch (e) {
      this.dialog.open(MessageDialogComponent, <MatDialogConfig>{
        disableClose: true,
        data: {
          title: 'Operation failed',
          message: e,
          type: 'error'
        }
      });
    }
  }

  cancel() {
    this.Result.clear();
    this.dialogRef.close();
  }

}
