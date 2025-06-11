import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHabilidadesComponent } from './table-habilidades.component';

describe('TableHabilidadesComponent', () => {
  let component: TableHabilidadesComponent;
  let fixture: ComponentFixture<TableHabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableHabilidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableHabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
