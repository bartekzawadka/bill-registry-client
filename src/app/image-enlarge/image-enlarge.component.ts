import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-enlarge',
  templateUrl: './image-enlarge.component.html',
  styleUrls: ['./image-enlarge.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageEnlargeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImageEnlargeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
