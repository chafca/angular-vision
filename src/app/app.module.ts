import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }  from './app.component';
import { RequestComponent } from './request.component';
import { RequestService } from './request.service';
import { ResultComponent } from './result.component';
import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    AppRoutingModule
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
