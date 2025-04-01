import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPerfilInformacoesComponent } from './dialog-perfil-informacoes.component';

describe('DialogPerfilInformacoesComponent', () => {
  let component: DialogPerfilInformacoesComponent;
  let fixture: ComponentFixture<DialogPerfilInformacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPerfilInformacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPerfilInformacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
