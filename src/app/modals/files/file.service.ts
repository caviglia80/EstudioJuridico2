import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  //  private baseUrl = environment.apiUrl;
  private baseUrl = 'http://localhost:3000/files';
  private headers = {
    'bypass-tunnel-reminder': 'xx'
  };

  constructor(private http: HttpClient) { }

  getFiles(path: string = ''): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`, { params: { path }, headers: this.headers });
  }

  getFileContent(path: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/content`, { params: { path }, responseType: 'blob', headers: this.headers });
  }

  downloadFolderAsZip(path: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download-zip`, { params: { path }, responseType: 'blob', headers: this.headers });
  }
}
