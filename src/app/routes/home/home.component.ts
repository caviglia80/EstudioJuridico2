import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ContactoComponent } from '@modals/contacto/contacto.component';
import { AreasComponent } from '@modals/areas/areas.component';
import { ConsultaComponent } from '@modals/consulta/consulta.component';
import { Howl } from 'howler';
import { FilesComponent } from '@modals/files/files.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef | null = null;
  sound: Howl | null = null;

  constructor(private modalService: BsModalService) { }

  async ngOnInit() {
    this.sound = new Howl({
      src: ['assets/sound/button-50.mp3']
    });
  }

  async onHoverButton() {
    try {
      if (this.sound?.playing() || !this.sound) this.sound = new Howl({ src: ['assets/sound/button-50.mp3'] });
      if (this.sound) this.sound.play();
    } catch (error) {
      console.error(error);
    }
  }

  openContacto() {
    this.modalRef = this.modalService.show(ContactoComponent, { class: 'modal-xl modal-dialog-centered' });
  }

  openAreas() {
    this.modalRef = this.modalService.show(AreasComponent, { class: 'modal-xl opacity-75 modal-dialog-centered' });
  }

  openConsulta() {
    this.modalRef = this.modalService.show(ConsultaComponent, { class: 'modal-xl opacity-75 modal-dialog-centered' });
  }

  openFiles() {
    this.modalRef = this.modalService.show(FilesComponent, { class: 'modal-xl opacity-75 modal-dialog-centered' });
  }
}
