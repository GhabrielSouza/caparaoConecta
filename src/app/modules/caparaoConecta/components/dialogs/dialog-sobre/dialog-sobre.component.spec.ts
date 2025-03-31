import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSobreComponent } from './dialog-sobre.component';

describe('DialogSobreComponent', () => {
  let component: DialogSobreComponent;
  let fixture: ComponentFixture<DialogSobreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSobreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSobreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
