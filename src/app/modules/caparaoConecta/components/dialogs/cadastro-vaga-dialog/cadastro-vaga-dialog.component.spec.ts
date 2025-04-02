import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatInputModule} from '@angular/material/input';
import {Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

import { CadastroVagaDialogComponent } from './cadastro-vaga-dialog.component';

describe('CadastroVagaDialogComponent', () => {
  let component: CadastroVagaDialogComponent;
  let fixture: ComponentFixture<CadastroVagaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroVagaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroVagaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
