import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDefaultInformacoesComponent } from './card-default-informacoes.component';

describe('CardDefaultInformacoesComponent', () => {
  let component: CardDefaultInformacoesComponent;
  let fixture: ComponentFixture<CardDefaultInformacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDefaultInformacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDefaultInformacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
