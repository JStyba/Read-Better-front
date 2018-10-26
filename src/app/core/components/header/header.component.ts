import {Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('StickyTopNav') menuElement: ElementRef;
  topNav = false;
  elementPosition: any;

  constructor(private router: Router) {
  }

  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
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
}

