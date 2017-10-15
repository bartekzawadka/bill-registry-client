import {ChangeDetectorRef, Component, Inject, ViewEncapsulation, Renderer2} from '@angular/core';
import {OptionSet} from '../../models/OptionSet';
import {OptionItem} from '../../models/OptionItem';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
declare let scanner;

@Component({
  selector: 'app-bill-scanning',
  templateUrl: './bill-scanning.component.html',
  styleUrls: ['./bill-scanning.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BillScanningComponent {
  public imageScanned: any;
  formatsOptions: OptionSet<string>;

  constructor(public dialogRef: MatDialogRef<BillScanningComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public ref: ChangeDetectorRef,
              private _renderer: Renderer2) {
    this.formatsOptions = new OptionSet<string>();
    this.formatsOptions.SelectedValue = 'png';
    this.formatsOptions.Options = [
      new OptionItem('PNG', 'png'),
      new OptionItem('JPEG', 'jpeg'),
      new OptionItem('PDF', 'pdf')
    ];
  }

  scan() {

    const me = this;

    const displayImagesOnPage = function(successfull, mesg, response) {
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
        console.log(images[0]);

        const scannedImageDiv = document.getElementById('scannedImage');
        if (scannedImageDiv) {
          scannedImageDiv.innerHTML = '';
        }

        const img = new Image();
        img.height = 400;
        img.onload = function(){
          document.getElementById('scannedImage').appendChild(img);
        };
        img.src = images[0].src;

         me.imageScanned = images[0];
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
    this.dialogRef.close();
  }

}
