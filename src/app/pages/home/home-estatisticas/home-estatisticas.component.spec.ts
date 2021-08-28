import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEstatisticasComponent } from './home-estatisticas.component';

describe('HomeEstatisticasComponent', () => {
  let component: HomeEstatisticasComponent;
  let fixture: ComponentFixture<HomeEstatisticasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEstatisticasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEstatisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
