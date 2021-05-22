import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { VidTutorialsComponent } from './vid-tutorials/vid-tutorials.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from './Shared/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    VidTutorialsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
