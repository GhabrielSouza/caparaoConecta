import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroInputComponent } from './genero-input.component';

describe('GeneroInputComponent', () => {
  let component: GeneroInputComponent;
  let fixture: ComponentFixture<GeneroInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneroInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneroInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
