import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataNascimentoInputComponent } from './data-nascimento-input.component';

describe('DataNascimentoInputComponent', () => {
  let component: DataNascimentoInputComponent;
  let fixture: ComponentFixture<DataNascimentoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataNascimentoInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataNascimentoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
