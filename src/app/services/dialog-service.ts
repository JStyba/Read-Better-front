import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { of } from 'rxjs';
import {UserService} from './user-service';

@Injectable()
export class DialogService {
  constructor(private us: UserService) {}
  confirm(message?: string): Observable<boolean> {
    const confirmation = confirm(message || 'Are you sure?');
    return of(confirmation);
  }
}
