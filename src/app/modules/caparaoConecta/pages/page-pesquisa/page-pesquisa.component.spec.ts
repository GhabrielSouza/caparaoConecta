import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePesquisaComponent } from './page-pesquisa.component';

describe('PagePesquisaComponent', () => {
  let component: PagePesquisaComponent;
  let fixture: ComponentFixture<PagePesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePesquisaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
