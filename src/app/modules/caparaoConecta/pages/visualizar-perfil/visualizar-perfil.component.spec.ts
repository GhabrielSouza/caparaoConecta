import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPerfilComponent } from './visualizar-perfil.component';

describe('VisualizarPerfilComponent', () => {
  let component: VisualizarPerfilComponent;
  let fixture: ComponentFixture<VisualizarPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
