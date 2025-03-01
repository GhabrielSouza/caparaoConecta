import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroEmpresaComponent } from './form-cadastro-empresa.component';

describe('FormCadastroEmpresaComponent', () => {
  let component: FormCadastroEmpresaComponent;
  let fixture: ComponentFixture<FormCadastroEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCadastroEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCadastroEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
