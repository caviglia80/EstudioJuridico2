import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:3000/files';  // URL local del servidor NestJS

  constructor(private http: HttpClient) { }

  getFiles(path: string = ''): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`, { params: { path } });
  }

  getFileContent(path: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/content`, { params: { path }, responseType: 'blob' });
  }
}
