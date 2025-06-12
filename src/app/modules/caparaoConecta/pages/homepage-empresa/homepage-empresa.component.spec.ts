import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageEmpresaComponent } from './homepage-empresa.component';

describe('HomepageEmpresaComponent', () => {
  let component: HomepageEmpresaComponent;
  let fixture: ComponentFixture<HomepageEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
