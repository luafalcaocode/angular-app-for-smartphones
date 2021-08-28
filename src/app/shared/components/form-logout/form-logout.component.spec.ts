import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLogoutComponent } from './form-logout.component';

describe('FormLogoutComponent', () => {
  let component: FormLogoutComponent;
  let fixture: ComponentFixture<FormLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
