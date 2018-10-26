import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReadBetterComponent } from './my-read-better.component';

describe('MyReadBetterComponent', () => {
  let component: MyReadBetterComponent;
  let fixture: ComponentFixture<MyReadBetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReadBetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReadBetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
