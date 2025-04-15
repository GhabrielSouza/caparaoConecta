import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDefaultPerfilComponent } from './component-default-perfil.component';

describe('ComponentDefaultPerfilComponent', () => {
  let component: ComponentDefaultPerfilComponent;
  let fixture: ComponentFixture<ComponentDefaultPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentDefaultPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentDefaultPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
