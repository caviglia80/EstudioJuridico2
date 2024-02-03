import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {
  constructor(public modalRef: BsModalRef) { }

  public enviarTexto(txt: string): void {
    const url = "https://wa.me/5492364658333" + "/?text=" + txt;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
