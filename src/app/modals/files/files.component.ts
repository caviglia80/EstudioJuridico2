import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FileService } from './file.service';
import { tap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  constructor(public modalRef: BsModalRef, private fileService: FileService) { }

  files: any[] = [];
  currentPath: string = 'desktop'; // Inicia en el escritorio
  directoriesCount: number = 0;
  filesCount: number = 0;
  loading: boolean = false;

  ngOnInit() {
    this.loadFiles(this.currentPath);
  }

  loadFiles(path: string = '') {
    this.loading = true;
    this.fileService.getFiles(path).pipe(
      tap(files => {
        // Ordenar los archivos y carpetas
        this.files = files.sort((a, b) => {
          if (a.isDirectory && !b.isDirectory) {
            return -1;
          }
          if (!a.isDirectory && b.isDirectory) {
            return 1;
          }
          if (!a.isDirectory && !b.isDirectory) {
            const extA = a.name.split('.').pop().toLowerCase();
            const extB = b.name.split('.').pop().toLowerCase();
            return extA.localeCompare(extB);
          }
          return a.name.localeCompare(b.name);
        });
        this.currentPath = path;
        this.updateCounts();
      }),
      catchError(error => {
        console.error('Error fetching files:', error);
        return of([]);
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  navigateTo(file: any) {
    if (file.isDirectory) {
      this.loadFiles(file.path);
    } else {
      this.downloadFile(file.path);
    }
  }

  downloadFile(path: string) {
    this.fileService.getFileContent(path).pipe(
      tap(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = path.split('/').pop() ?? '';
        a.click();
        window.URL.revokeObjectURL(url);
      }),
      catchError(error => {
        console.error('Error downloading file:', error);
        return of(null);
      })
    ).subscribe();
  }

  goBack() {
    if (this.currentPath !== 'desktop') {
      const parts = this.currentPath.split('/');
      parts.pop();
      this.loadFiles(parts.join('/') || 'desktop');
    }
  }

  goToFolder(folder: string) {
    this.currentPath = folder;
    this.loadFiles(folder);
  }

  getIcon(file: any) {
    if (file.isDirectory) {
      return 'bi bi-folder';
    }
    const extension = file.name.split('.').pop().toLowerCase();
    switch (extension) {
      case 'txt':
      case 'md':
        return 'bi bi-file-earmark-text';
      case 'pdf':
        return 'bi bi-file-earmark-pdf';
      case 'doc':
      case 'docx':
        return 'bi bi-file-earmark-word';
      case 'xls':
      case 'xlsx':
        return 'bi bi-file-earmark-excel';
      case 'ppt':
      case 'pptx':
        return 'bi bi-file-earmark-slides';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
        return 'bi bi-file-earmark-image';
      case 'mp4':
      case 'avi':
      case 'mkv':
      case 'mov':
        return 'bi bi-file-earmark-play';
      case 'mp3':
      case 'wav':
      case 'flac':
        return 'bi bi-file-earmark-music';
      case 'zip':
      case 'rar':
      case 'tar':
      case 'gz':
        return 'bi bi-file-earmark-zip';
      default:
        return 'bi bi-file-earmark';
    }
  }

  capitalizeFirstLetter(path: string): string {
    return path.charAt(0).toUpperCase() + path.slice(1);
  }

  updateCounts() {
    this.directoriesCount = this.files.filter(file => file.isDirectory).length;
    this.filesCount = this.files.filter(file => !file.isDirectory).length;
  }
}
