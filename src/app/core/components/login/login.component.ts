import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, RouterModule} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../../services/authentication-service';
import {UserService} from '../../../services/user-service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  selector: 'app-login'})
export class LoginComponent  implements OnInit {

  constructor(private http: HttpClient
              , private router: Router
              , private formBuilder: FormBuilder
              , private auth: AuthenticationService
              , private userService: UserService) {
  }
  username: string;
  password: string;
    ngOnInit() {
       }

  onSubmit() {
      this.userService.setUsername(this.username);
     this.auth.login(this.username, this.password).subscribe( r => {
          if (r !== undefined) {
            this.userService.setToken(r['access_token']);
            this.router.navigateByUrl('home');
          }
        }, r => {
          alert(r.error.error);
        });
  }


   }
