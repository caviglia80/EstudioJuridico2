import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { SocialButtonsComponent } from './shared/social-buttons/social-buttons.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ContactoComponent } from './modals/contacto/contacto.component';
import { AreasComponent } from './modals/areas/areas.component';
import { ConsultaComponent } from './modals/consulta/consulta.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SocialButtonsComponent,
    ContactoComponent,
    AreasComponent,
    ConsultaComponent,
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
