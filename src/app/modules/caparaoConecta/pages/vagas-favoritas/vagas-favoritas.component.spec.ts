import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasFavoritasComponent } from './vagas-favoritas.component';

describe('VagasFavoritasComponent', () => {
  let component: VagasFavoritasComponent;
  let fixture: ComponentFixture<VagasFavoritasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VagasFavoritasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VagasFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
