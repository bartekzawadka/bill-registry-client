import {ChangeDetectorRef, Component, Inject, ViewEncapsulation} from '@angular/core';
import {OptionSet} from '../../models/OptionSet';
import {OptionItem} from '../../models/OptionItem';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogResult} from '../../interfaces/dialog-result';
import {BillAcquisitionResult} from '../../models/BillAcquisitionResult';

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
              public ref: ChangeDetectorRef) {

    this.Result = new BillAcquisitionResult();

    this.formatsOptions = new OptionSet<string>();
    this.formatsOptions.SelectedValue = 'png';
    this.formatsOptions.Options = [
      new OptionItem('PNG', 'png'),
      new OptionItem('JPEG', 'jpeg'),
      new OptionItem('PDF', 'pdf')
    ];
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

      const images = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
      if (images && images.length > 0) {
        const scannedImageDiv = document.getElementById('scannedImage');
        if (scannedImageDiv) {
          scannedImageDiv.innerHTML = '';
        }

        const img = new Image();
        img.height = 400;
        img.onload = function () {
          document.getElementById('scannedImage').appendChild(img);
        };

        img.src = images[0].src;

        me.Result.ScannedImage = images[0];
        me.ref.detectChanges();
      }
    };

    scanner.scan(displayImagesOnPage, {
      'output_settings': [
        {
          'type': 'return-base64',
          'format': this.formatsOptions.SelectedValue
        }
      ]
    });
  }

  cancel() {
    this.Result.clear();
    this.dialogRef.close();
  }

}
