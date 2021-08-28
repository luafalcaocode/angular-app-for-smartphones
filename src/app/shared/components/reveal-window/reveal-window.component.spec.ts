import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevealWindowComponent } from './reveal-window.component';

describe('RevealWindowComponent', () => {
  let component: RevealWindowComponent;
  let fixture: ComponentFixture<RevealWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevealWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevealWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
