import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpfAndCnpjInputComponent } from './cpf-and-cnpj-input.component';

describe('CpfAndCnpjInputComponent', () => {
  let component: CpfAndCnpjInputComponent;
  let fixture: ComponentFixture<CpfAndCnpjInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpfAndCnpjInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpfAndCnpjInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
