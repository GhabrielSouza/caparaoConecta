import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFormacaoAcademicaComponent } from './form-formacao-academica.component';

describe('FormFormacaoAcademicaComponent', () => {
  let component: FormFormacaoAcademicaComponent;
  let fixture: ComponentFixture<FormFormacaoAcademicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFormacaoAcademicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFormacaoAcademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
