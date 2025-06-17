import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVagasFavoritasComponent } from './card-vagas-favoritas.component';

describe('CardVagasFavoritasComponent', () => {
  let component: CardVagasFavoritasComponent;
  let fixture: ComponentFixture<CardVagasFavoritasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVagasFavoritasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVagasFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
