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
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule, MatSelectModule, MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
import { MdePopoverModule } from '@material-extended/mde';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PopOverComponent} from './core/components/home/pop-over/pop-over.component';
import {WordTranslationService} from './services/word-translation-service';
import { AboutComponent } from './core/components/about/about.component';
import { ContactComponent } from './core/components/contact/contact.component';
import { SideDrawerComponent } from './core/components/home/side-drawer/side-drawer.component';
import {UserWordDatabaseService} from './services/user-word-database-service';
import { MyReadBetterComponent } from './core/components/my-read-better/my-read-better.component';
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
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'myreadbetter',
    component: MyReadBetterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'start',
    component: StartComponent
  }
  ];
export const MaterialModules = [
  MatToolbarModule,
  MatCardModule,
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatSelectModule
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
    PopOverComponent,
    AboutComponent,
    ContactComponent,
    SideDrawerComponent,
    MyReadBetterComponent,
                    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModules,
    MdePopoverModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes)
     ],
  entryComponents: [
    PopOverComponent, SideDrawerComponent
  ],
  providers: [AuthenticationService
    , AuthGuard, UserService
    , AlertService
    , PopOverComponent
    , WordTranslationService
    , UserWordDatabaseService
    , SideDrawerComponent
    , UserService,
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
  bootstrap: [AppComponent],
  })
export class AppModule {
}
