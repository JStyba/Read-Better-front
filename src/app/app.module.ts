import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';

import {HttpClientModule} from '@angular/common/http';
import { TargetPageComponent } from './dict/target-page/target-page.component';

import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    TargetPageComponent,
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
      {
        path: 'test',
        component: TargetPageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  })
export class AppModule {
}
