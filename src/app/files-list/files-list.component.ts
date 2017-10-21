import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { humanizeBytes } from '../utilities';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilesListComponent implements OnInit {

  @Input('data') data: File[];
  humanizeBytes: Function;

  constructor() {
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
  }

  getIconType(mimeType) {
    if (!mimeType) {
      return 'insert_drive_file';
    }
    if (mimeType.includes('image')) {
      return 'photo';
    }
    if (mimeType.includes('pdf')) {
      return 'picture_as_pdf';
    }

    return 'insert_drive_file';
  }

}
