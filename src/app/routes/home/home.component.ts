import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ContactoComponent } from '@modals/contacto/contacto.component';
import { AreasComponent } from '@modals/areas/areas.component';
import { ConsultaComponent } from '@modals/consulta/consulta.component';
import { Howl } from 'howler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef | null = null;
  sound: Howl | null = null;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.sound = new Howl({
      src: ['assets/sound/button-50.mp3']
    });
  }

  onHoverButton() {
    if (this.sound) this.sound.play();
  }

  openContacto() {
    this.modalRef = this.modalService.show(ContactoComponent, { class: 'modal-xl modal-dialog-centered' });
  }

  openAreas() {
    this.modalRef = this.modalService.show(AreasComponent);
  }

  openConsulta() {
    this.modalRef = this.modalService.show(ConsultaComponent, { class: 'modal-xl opacity-75 modal-dialog-centered' });
  }
}
