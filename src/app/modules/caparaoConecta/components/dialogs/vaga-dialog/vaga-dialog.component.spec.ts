import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaDialogComponent } from './vaga-dialog.component';

describe('VagaDialogComponent', () => {
  let component: VagaDialogComponent;
  let fixture: ComponentFixture<VagaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VagaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VagaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
