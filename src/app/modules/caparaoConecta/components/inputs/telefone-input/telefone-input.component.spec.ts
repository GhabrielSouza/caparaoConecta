import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefoneInputComponent } from './telefone-input.component';

describe('TelefoneInputComponent', () => {
  let component: TelefoneInputComponent;
  let fixture: ComponentFixture<TelefoneInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelefoneInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelefoneInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
