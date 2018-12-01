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


const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'myreadbetter', component: MyReadBetterComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'admin', component: AdminPanelComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'about', component: AboutComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'contact', component: ContactComponent, canDeactivate: [CanDeactivateGuard]},

  // otherwise redirect to start
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
