import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideDrawerFileListComponent } from './side-drawer-file-list.component';

describe('SideDrawerFileListComponent', () => {
  let component: SideDrawerFileListComponent;
  let fixture: ComponentFixture<SideDrawerFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideDrawerFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideDrawerFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
