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
import {DataService} from './services/data-service';
import {CanDeactivateGuard} from './services/can-deactivate-guard';
import { PopOverRBComponent } from './core/components/my-read-better/pop-over-rb/pop-over-rb.component';
import {NgcCookieConsentConfig, NgcCookieConsentModule} from 'ngx-cookieconsent';
import {AdminPanelComponent} from './core/components/admin-panel/admin-panel.component';
import {AdminService} from './services/admin-service';
import {DemoService} from './services/demo-service';
import {DialogService} from './services/dialog-service';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {FileUploadService} from './services/file-upload-service';
import { WebpageComponent } from './core/components/home/webpage/webpage.component';
import { DocumentComponent } from './core/components/home/document/document.component';
import { ConfirmationDialogComponent } from './services/confirmation-dialog/confirmation-dialog.component';


const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'read-better.pl'
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};
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
  },
  {
    path: 'admin',
    component: AdminPanelComponent
  },
  {
    path: 'document',
    component: DocumentComponent
  },
  {
    path: 'webpage',
    component: WebpageComponent
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
    PopOverRBComponent,
    AdminPanelComponent,
    WebpageComponent,
    DocumentComponent,
    ConfirmationDialogComponent,
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
    PdfViewerModule,
    RouterModule.forRoot(appRoutes),
    NgcCookieConsentModule.forRoot(cookieConfig)
     ],
  entryComponents: [
    PopOverComponent, SideDrawerComponent, PopOverRBComponent, ConfirmationDialogComponent
  ],
  providers: [
    AuthenticationService
    , AuthGuard
    , UserService
    , AlertService
    , PopOverComponent
    , WordTranslationService
    , UserWordDatabaseService
    , SideDrawerComponent
    , UserService
    , DataService
    , CanDeactivateGuard
    , AdminService
    , DemoService
    , DialogService
    , FileUploadService,
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
  bootstrap: [AppComponent],
  })
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
