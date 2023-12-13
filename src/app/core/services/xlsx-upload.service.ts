import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { HttpAPIService } from './http-api.service';

@Injectable({
  providedIn: 'root'
})
export class XlsxUploadService {

  constructor(private http: HttpClient, private apiService: HttpAPIService) { }

  public getPresignedS3URLs(fileNames: string[]): Observable<any> {
    console.log('Getting pre-signed URLs for files:', fileNames);
    return forkJoin(
      fileNames.map(fileName => 
        this.apiService.get(fileName)
          .pipe(
            tap((response: any) => {
              console.log(`Received pre-signed URL for ${fileName}:`, response);
            }),
            map(response => response),
            catchError(this.handleAndThrowRemoteError.bind(this))
          )
      )
    ).pipe(
      finalize(() => console.log('Completed getting pre-signed URLs'))
    );
  }

  public uploadFile(url: string, file: File, contentType: string): Observable<any> {
    
    console.log(`Uploading file: ${file.name} to URL: ${url}`);
    return this.http.put(
      url,
      file,
      this.generateHeaders(contentType)
    ).pipe(
      tap(() => console.log(`Upload successful for file: ${file.name}`)),
      catchError(this.handleAndThrowRemoteError.bind(this))
    );
  }

  public uploadMultipleFiles(files: File[]): Observable<any> {
    console.log('Starting upload for multiple files:', files.map(f => f.name));
    const fileNames = files.map(file => file.name);
  
    return this.getPresignedS3URLs(fileNames).pipe(
      switchMap(responseArray => {
        // Extract presigned URLs from the response objects
        const presignedUrls = responseArray.map(res => res.presignedUrl);
  
        const uploadRequests = files.map((file, index) => 
          this.uploadFile(presignedUrls[index], file, file.type)
        );
  
        return forkJoin(uploadRequests).pipe(
          tap(() => console.log('All upload requests created'))
        );
      }),
      catchError(this.handleAndThrowRemoteError.bind(this))
    );
  }
  
  
  private generateHeaders(contentType: string): any {
    console.log(`Generating headers with Content-Type: ${contentType}`);
    return {
      headers: new HttpHeaders({'Content-Type': contentType})
    };
  }

  private handleAndThrowRemoteError(
    error: HttpErrorResponse | any
  ): Observable<any> {
    console.error('Error occurred:', error);
    return throwError(error);
  }
}
