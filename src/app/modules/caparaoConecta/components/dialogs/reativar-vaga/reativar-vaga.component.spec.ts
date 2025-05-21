import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReativarVagaComponent } from './reativar-vaga.component';

describe('ReativarVagaComponent', () => {
  let component: ReativarVagaComponent;
  let fixture: ComponentFixture<ReativarVagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReativarVagaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReativarVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
