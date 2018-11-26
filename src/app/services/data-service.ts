import {Injectable} from '@angular/core';

@Injectable()
export class DataService {
  // urlToBackend = 'https://secret-dawn-55833.herokuapp.com'; // Heroku
  urlToBackend = 'http://localhost:8080';
  secret = 'jerry:jerry-secret';
  adminPassword = 'magus';
  adminLogin = 'admin';
}
