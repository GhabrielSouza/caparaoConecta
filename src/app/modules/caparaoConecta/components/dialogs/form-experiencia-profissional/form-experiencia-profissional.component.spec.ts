import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExperienciaProfissionalComponent } from './form-experiencia-profissional.component';

describe('FormExperienciaProfissionalComponent', () => {
  let component: FormExperienciaProfissionalComponent;
  let fixture: ComponentFixture<FormExperienciaProfissionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormExperienciaProfissionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormExperienciaProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
