import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroDesaparecidosComponent } from './form-cadastro-desaparecidos.component';

describe('FormCadastroDesaparecidosComponent', () => {
  let component: FormCadastroDesaparecidosComponent;
  let fixture: ComponentFixture<FormCadastroDesaparecidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCadastroDesaparecidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCadastroDesaparecidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
