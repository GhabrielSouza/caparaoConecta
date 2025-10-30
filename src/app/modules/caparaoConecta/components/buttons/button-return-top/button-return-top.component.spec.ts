import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonReturnTopComponent } from './button-return-top.component';

describe('ButtonReturnTopComponent', () => {
  let component: ButtonReturnTopComponent;
  let fixture: ComponentFixture<ButtonReturnTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonReturnTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonReturnTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
