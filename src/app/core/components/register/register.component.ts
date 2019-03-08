import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user-service';
import {AlertService} from '../../../services/alert-service';
import {first} from 'rxjs/operators';
import {User} from '../../../model/user';
import {AuthenticationService} from '../../../services/authentication-service';
import {getToken} from 'codelyzer/angular/styles/cssLexer';
import {AdminService} from '../../../services/admin-service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  constructor(private userService: UserService
    , private alertService: AlertService
    , private router: Router
    , private auth: AuthenticationService
    , private us: UserService
  , private as: AdminService) {
  }

  loading = false;
  submitted = false;
  username: string;
  password: string;
  email: string;

  ngOnInit() {
    this.getToken();
    this.createForm();
  }
createForm() {
this.form = new FormGroup({
  username: new FormControl(''),
  password: new FormControl(''),
  email: new FormControl('')
})
}
  getToken() {
    this.auth.login('admin', 'stereo').subscribe( r => {
      if (r !== undefined) {
        localStorage.setItem('tmp_token', r['access_token']);
        }
    }, r => {
      alert(r.error.error);
    });
    }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    const user = new User(this.form.value.username, this.form.value.password, this.form.value.email);
    this.as.register(user)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          localStorage.removeItem('tmp_token');
          this.router.navigateByUrl('admin');
          this.form.reset;
        },
        error => {
          localStorage.removeItem('tmp_token');
        });
  }

}
