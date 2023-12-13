import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CoreConstants } from '../../../core/core.constants';

@Component({
  selector: 'app-xlsx-upload',
  templateUrl: './xlsx-upload.component.html',
  styleUrls: ['./xlsx-upload.component.scss']
})
export class XlsxUploadComponent implements OnInit {
  
  public xlsxToUpload: File[] = [];
  public maxFileSize = 10; // Max file size in MB
  @Output() public xlsxPicked = new EventEmitter<File[]>();

  constructor() { }

  ngOnInit(): void {
  }



  
  public doXlsxPicked(event: any): void {
    const files: FileList = event.target.files;
    if (files) {
      this.xlsxToUpload = Array.from(files);
      this.xlsxPicked.emit(this.xlsxToUpload);
    }
  }
  
  private calcFilesize(bytes: number, roundTo: number = 2): number {
    const fileSizeMB = bytes / (1024 * 1024); // Convert bytes to megabytes
    return Number(fileSizeMB.toFixed(roundTo));
  }

}
