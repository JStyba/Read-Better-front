import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {UserService} from './user-service';

export interface ComponentCanDeactivate {
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
   canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | Promise<boolean> | boolean {
   return component.canDeactivate() ? component.canDeactivate() : true;
      }
  }
