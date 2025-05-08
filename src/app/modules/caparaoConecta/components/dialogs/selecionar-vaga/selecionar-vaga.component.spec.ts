import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarVagaComponent } from './selecionar-vaga.component';

describe('SelecionarVagaComponent', () => {
  let component: SelecionarVagaComponent;
  let fixture: ComponentFixture<SelecionarVagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarVagaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionarVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
