import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarFotoUsuarioComponent } from './dialog-editar-foto-usuario.component';

describe('DialogEditarFotoUsuarioComponent', () => {
  let component: DialogEditarFotoUsuarioComponent;
  let fixture: ComponentFixture<DialogEditarFotoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditarFotoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditarFotoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
