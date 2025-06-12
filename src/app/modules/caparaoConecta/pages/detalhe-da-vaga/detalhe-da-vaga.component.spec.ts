import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheDaVagaComponent } from './detalhe-da-vaga.component';

describe('DetalheDaVagaComponent', () => {
  let component: DetalheDaVagaComponent;
  let fixture: ComponentFixture<DetalheDaVagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheDaVagaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheDaVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
