import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';

import { AppComponent }  from './app.component';
import { RequestComponent } from './request.component';
import { RequestService } from './request.service';
import { ResultComponent } from './result.component';
import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BusyModule
   ],
  declarations: [
    AppComponent,
    RequestComponent,
    ResultComponent
  ],
  providers: [
    RequestService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
