import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopOverRBComponent } from './pop-over-rb.component';

describe('PopOverRBComponent', () => {
  let component: PopOverRBComponent;
  let fixture: ComponentFixture<PopOverRBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopOverRBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopOverRBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
