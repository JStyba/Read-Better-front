import {Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication-service';

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
    constructor(private router: Router, private auth: AuthenticationService) {
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
    localStorage.clear();
    this.router.navigateByUrl('start');
  }

  goToStartPage() {
    this.router.navigateByUrl('start');
  }
}

