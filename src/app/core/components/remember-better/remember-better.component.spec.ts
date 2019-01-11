import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RememberBetterComponent } from './remember-better.component';

describe('RememberBetterComponent', () => {
  let component: RememberBetterComponent;
  let fixture: ComponentFixture<RememberBetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RememberBetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RememberBetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
