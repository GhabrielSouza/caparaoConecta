import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVagaEmpresaComponent } from './card-vaga-empresa.component';

describe('CardVagaEmpresaComponent', () => {
  let component: CardVagaEmpresaComponent;
  let fixture: ComponentFixture<CardVagaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVagaEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVagaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
