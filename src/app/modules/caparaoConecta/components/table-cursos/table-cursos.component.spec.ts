import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCursosComponent } from './table-cursos.component';

describe('TableCursosComponent', () => {
  let component: TableCursosComponent;
  let fixture: ComponentFixture<TableCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
