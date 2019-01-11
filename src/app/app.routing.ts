import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './core/components/home/home.component';
import {AuthGuard} from './services/auth-guard';
import {LoginComponent} from './core/components/login/login.component';
import {RegisterComponent} from './core/components/register/register.component';
import {CanDeactivateGuard} from './services/can-deactivate-guard';
import {MyReadBetterComponent} from './core/components/my-read-better/my-read-better.component';
import {AdminPanelComponent} from './core/components/admin-panel/admin-panel.component';
import {AboutComponent} from './core/components/about/about.component';
import {ContactComponent} from './core/components/contact/contact.component';
import {DocumentComponent} from './core/components/home/document/document.component';
import {WebpageComponent} from './core/components/home/webpage/webpage.component';
import {RememberBetterComponent} from './core/components/remember-better/remember-better.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'myreadbetter', component: MyReadBetterComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  { path: 'about', component: AboutComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'contact', component: ContactComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'document', component: DocumentComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  { path: 'webpage', component: WebpageComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  { path: 'remember', component: RememberBetterComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},

  // otherwise redirect to start
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
