import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CoreConstants } from './../../../core/core.constants';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  
  public filesToUpload: File[] = [];
  public maxFileSize = 10; // Max file size in MB
  @Output() public filesPicked = new EventEmitter<File[]>();

  constructor() { }

  ngOnInit(): void {
  }

  public doFilePicked(event: any): void {
    const files: FileList = event.target.files;
    if (files) {
      this.filesToUpload = Array.from(files);
      this.filesPicked.emit(this.filesToUpload);
    }
  }


  
  private calcFilesize(bytes: number, roundTo: number = 2): number {
    const fileSizeMB = bytes / (1024 * 1024); // Convert bytes to megabytes
    return Number(fileSizeMB.toFixed(roundTo));
  }

}
