import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileUploadService } from './../core/services/file-upload.service';
import { XlsxUploadService } from './../core/services/xlsx-upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public response$: Observable<any>;
  public filesToUpload: File[] = [];
  public xlsxToUpload: File[] = [];

  constructor(
    private fileUploadService: FileUploadService, 
    private xlsxUploadService: XlsxUploadService
  ) { }

  ngOnInit(): void {
  }

  public onUpload(): void {
    console.log('Upload button clicked');
    console.log('PDF Files to upload:', this.filesToUpload);
    this.fileUploadService.uploadMultipleFiles(this.filesToUpload).pipe(
      catchError(this.handleError)
    ).subscribe(
      response => this.onNext(response),
      error => this.onError(error),
      () => this.onComplete()
    );
  }

  public onUploadXlsx(): void {
    console.log('Upload XLSX button clicked');
    console.log('XLSX Files to upload:', this.xlsxToUpload);
    this.xlsxUploadService.uploadMultipleFiles(this.xlsxToUpload).pipe(
      catchError(this.handleError)
    ).subscribe(
      response => this.onNext(response),
      error => this.onError(error),
      () => this.onComplete()
    );
  }

  public onFilePicked(files: File[]): void {
    this.filesToUpload = files;
    console.log("PDF Files picked:", this.filesToUpload);
  }

  public onXlsxPicked(files: File[]): void {
    this.xlsxToUpload = files;
    console.log("XLSX Files picked:", this.xlsxToUpload);
  }

  private handleError(error: HttpErrorResponse | any): Observable<any> {
    console.error('Error occurred during file upload', error);
    return EMPTY;
  }

  private onNext(response): void {
    console.log('Response:', response);
  }

  private onError(error): void {
    console.error('Error:', error);
  }

  private onComplete(): void {
    console.log('File upload process is complete');
  }
}
