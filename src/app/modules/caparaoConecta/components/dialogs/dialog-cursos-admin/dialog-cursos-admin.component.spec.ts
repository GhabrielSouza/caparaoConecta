import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCursosAdminComponent } from './dialog-cursos-admin.component';

describe('DialogCursosAdminComponent', () => {
  let component: DialogCursosAdminComponent;
  let fixture: ComponentFixture<DialogCursosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCursosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCursosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
