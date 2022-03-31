import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BtCoreModule } from '@betatalks/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BtCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
