import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {

  title: string;
  type: {icon: string, color: string};

  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

}
