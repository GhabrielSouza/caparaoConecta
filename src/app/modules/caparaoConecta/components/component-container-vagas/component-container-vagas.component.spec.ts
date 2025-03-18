import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentContainerVagasComponent } from './component-container-vagas.component';

describe('ComponentContainerVagasComponent', () => {
  let component: ComponentContainerVagasComponent;
  let fixture: ComponentFixture<ComponentContainerVagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentContainerVagasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentContainerVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
