import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import {LoginComponent} from './core/components/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationService} from './services/authentication-service';
import {AuthGuard} from './services/auth-guard';
import {TokenInterceptor} from './services/token-interceptor';
import {UserService} from './services/user-service';
import { RegisterComponent } from './core/components/register/register.component';
import {ErrorInterceptor} from './services/error-interceptor';
import {AlertService} from './services/alert-service';
import { UsersComponent } from './core/components/users/users.component';
import { StartComponent } from './core/components/start/start.component';


const appRoutes: Routes = [
   {
    path: 'home',
    component: HomeComponent,
     canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    },
  {
    path: '',
    component: StartComponent
  }
  ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    UsersComponent,
    StartComponent,
                 ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
     ],
  providers: [AuthenticationService, AuthGuard, UserService, AlertService,
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
  bootstrap: [AppComponent],
  })
export class AppModule {
}
