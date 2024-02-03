import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  iframeCargado = false;

  constructor(public modalRef: BsModalRef) { }

  redirectToInstagram() {
    const appLink = "instagram://user?username=cavigliayasociados";
    const webLink = "https://www.instagram.com/cavigliayasociados";

    if (this.isInstagramAppInstalled())
      window.location.href = appLink;
    else
      window.open(webLink, '_blank', 'noopener,noreferrer');
  }

  isInstagramAppInstalled(): boolean {
    const isInstagramSupported = window.navigator && window.navigator.userAgent.match(/instagram/i);
    return !!(isInstagramSupported && window.location.href.startsWith("instagram://"));
  }
}
