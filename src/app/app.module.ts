import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { SocialButtonsComponent } from './shared/social-buttons/social-buttons.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ContactoComponent } from './modals/contacto/contacto.component';
import { AreasComponent } from './modals/areas/areas.component';
import { FaqComponent } from './modals/faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SocialButtonsComponent,
    ContactoComponent,
    AreasComponent,
    FaqComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
