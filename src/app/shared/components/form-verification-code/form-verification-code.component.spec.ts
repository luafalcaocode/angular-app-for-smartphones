import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVerificationCodeComponent } from './form-verification-code.component';

describe('FormVerificationCodeComponent', () => {
  let component: FormVerificationCodeComponent;
  let fixture: ComponentFixture<FormVerificationCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormVerificationCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVerificationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
