import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHabilidadesAdminComponent } from './dialog-habilidades-admin.component';

describe('DialogHabilidadesAdminComponent', () => {
  let component: DialogHabilidadesAdminComponent;
  let fixture: ComponentFixture<DialogHabilidadesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogHabilidadesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogHabilidadesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
