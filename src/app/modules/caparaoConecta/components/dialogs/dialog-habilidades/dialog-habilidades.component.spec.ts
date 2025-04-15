import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHabilidadesComponent } from './dialog-habilidades.component';

describe('DialogHabilidadesComponent', () => {
  let component: DialogHabilidadesComponent;
  let fixture: ComponentFixture<DialogHabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogHabilidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogHabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
