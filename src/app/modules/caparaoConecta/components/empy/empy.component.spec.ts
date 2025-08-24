import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpyComponent } from './empy.component';

describe('EmpyComponent', () => {
  let component: EmpyComponent;
  let fixture: ComponentFixture<EmpyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
