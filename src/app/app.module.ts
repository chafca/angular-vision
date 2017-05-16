import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { RequestComponent } from './request.component';
import { RequestService } from './request.service';
import { ResultComponent } from './result.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, RequestComponent, ResultComponent ],
  providers: [ RequestService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
