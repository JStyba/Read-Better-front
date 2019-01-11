import {Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication-service';
import {UserService} from '../../../services/user-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnInit {
  @ViewChild('StickyTopNav') menuElement: ElementRef;
  topNav = false;
  elementPosition: any;
  loggedIn: boolean;
  isAdmin = false;
    constructor(private router: Router, private auth: AuthenticationService, private us: UserService) {
  }
  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }
ngOnInit () {
    if (localStorage.getItem('loggedIn') === 'true') {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    if (localStorage.getItem('username') === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
}
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.topNav = true;
    } else {
      this.topNav = false;
    }
  }

  goToAboutPage() {
    this.router.navigateByUrl('about');
  }
  goToContactPage() {
    this.router.navigateByUrl('contact');
  }
  goToHomePage() {
    this.router.navigateByUrl('home');
  }

  goToMyReadBetter() {
    this.router.navigateByUrl('myreadbetter');
  }
  logout() {
    this.us.recordLogin();
    localStorage.clear();
    this.router.navigateByUrl('start');
  }

  goToStartPage() {
    this.router.navigateByUrl('start');
  }

  goToAdminPage() {
    this.router.navigateByUrl('admin');
  }

  goToRememberBetter() {
    this.router.navigateByUrl('remember');
  }
}

