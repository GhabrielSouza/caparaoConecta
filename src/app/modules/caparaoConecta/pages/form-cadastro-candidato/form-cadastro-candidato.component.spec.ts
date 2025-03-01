import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroCandidatoComponent } from './form-cadastro-candidato.component';

describe('FormCadastroCandidatoComponent', () => {
  let component: FormCadastroCandidatoComponent;
  let fixture: ComponentFixture<FormCadastroCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCadastroCandidatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCadastroCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
