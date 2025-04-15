import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTabelaComponent } from './dashboard-tabela.component';

describe('DashboardTabelaComponent', () => {
  let component: DashboardTabelaComponent;
  let fixture: ComponentFixture<DashboardTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
