import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAccordionComponent } from './component-accordion.component';

describe('ComponentAccordionComponent', () => {
  let component: ComponentAccordionComponent;
  let fixture: ComponentFixture<ComponentAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
