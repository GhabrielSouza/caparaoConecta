import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVagaFavoritaComponent } from './card-vaga-favorita.component';

describe('CardVagaFavoritaComponent', () => {
  let component: CardVagaFavoritaComponent;
  let fixture: ComponentFixture<CardVagaFavoritaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVagaFavoritaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVagaFavoritaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
