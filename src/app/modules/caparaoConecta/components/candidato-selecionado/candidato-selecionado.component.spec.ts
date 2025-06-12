import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoSelecionadoComponent } from './candidato-selecionado.component';

describe('CandidatoSelecionadoComponent', () => {
  let component: CandidatoSelecionadoComponent;
  let fixture: ComponentFixture<CandidatoSelecionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatoSelecionadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatoSelecionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
