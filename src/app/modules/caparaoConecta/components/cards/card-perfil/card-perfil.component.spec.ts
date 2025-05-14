import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPerfilComponent } from './card-perfil.component';

describe('CardPerfilComponent', () => {
  let component: CardPerfilComponent;
  let fixture: ComponentFixture<CardPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
