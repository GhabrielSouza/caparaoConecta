import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCandidatoComponent } from './perfil-candidato.component';

describe('PerfilCandidatoComponent', () => {
  let component: PerfilCandidatoComponent;
  let fixture: ComponentFixture<PerfilCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilCandidatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
