import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVagaPublicaComponent } from './card-vaga-publica.component';

describe('CardVagaPublicaComponent', () => {
  let component: CardVagaPublicaComponent;
  let fixture: ComponentFixture<CardVagaPublicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVagaPublicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVagaPublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
