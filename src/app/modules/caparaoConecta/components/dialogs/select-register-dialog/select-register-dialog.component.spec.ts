import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRegisterDialogComponent } from './select-register-dialog.component';

describe('SelectRegisterDialogComponent', () => {
  let component: SelectRegisterDialogComponent;
  let fixture: ComponentFixture<SelectRegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectRegisterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
