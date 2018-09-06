import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';

import {HttpClientModule} from '@angular/common/http';
import { DefinitionsPipePipe } from './dict/definitions-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DefinitionsPipePipe


  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
