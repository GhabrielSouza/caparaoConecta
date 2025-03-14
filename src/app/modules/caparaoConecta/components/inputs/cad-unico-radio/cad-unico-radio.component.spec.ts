import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadUnicoRadioComponent } from './cad-unico-radio.component';

describe('CadUnicoRadioComponent', () => {
  let component: CadUnicoRadioComponent;
  let fixture: ComponentFixture<CadUnicoRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadUnicoRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadUnicoRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
