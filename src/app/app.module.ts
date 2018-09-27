import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';

import {HttpClientModule} from '@angular/common/http';


import {RouterModule} from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
             ],
  imports: [
    BrowserModule,
    FormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent
      },
          ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  })
export class AppModule {
}
