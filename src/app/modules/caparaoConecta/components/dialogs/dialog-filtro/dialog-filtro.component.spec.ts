import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFiltroComponent } from './dialog-filtro.component';

describe('DialogFiltroComponent', () => {
  let component: DialogFiltroComponent;
  let fixture: ComponentFixture<DialogFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFiltroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
