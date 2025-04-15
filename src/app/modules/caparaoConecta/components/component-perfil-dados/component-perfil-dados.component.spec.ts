import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPerfilDadosComponent } from './component-perfil-dados.component';

describe('ComponentPerfilDadosComponent', () => {
  let component: ComponentPerfilDadosComponent;
  let fixture: ComponentFixture<ComponentPerfilDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentPerfilDadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentPerfilDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
