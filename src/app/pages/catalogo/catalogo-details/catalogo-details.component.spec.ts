import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoDetailsComponent } from './catalogo-details.component';

describe('CatalogoDetailsComponent', () => {
  let component: CatalogoDetailsComponent;
  let fixture: ComponentFixture<CatalogoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
