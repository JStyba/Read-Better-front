import {Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('StickyTopNav') menuElement: ElementRef;
  topNav = false;
  elementPosition: any;
  constructor() { }
  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }
  @HostListener('window:scroll', [ '$event'])
    handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.topNav = true;
    } else {
      this.topNav = false;
    }
  }
}

