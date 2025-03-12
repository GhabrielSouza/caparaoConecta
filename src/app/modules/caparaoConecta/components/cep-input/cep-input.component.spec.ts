import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CepInputComponent } from './cep-input.component';

describe('CepInputComponent', () => {
  let component: CepInputComponent;
  let fixture: ComponentFixture<CepInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CepInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CepInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
