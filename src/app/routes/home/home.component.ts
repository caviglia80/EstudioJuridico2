import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ContactoComponent } from '@modals/contacto/contacto.component';
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
    this.modalRef = this.modalService.show(ContactoComponent);
  }







}
