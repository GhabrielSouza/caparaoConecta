import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EDialogEnum } from '../../enum/EDialogEnum.enum';
import { SelectRegisterDialogComponent } from '../dialogs/select-register-dialog/select-register-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-default-login-layout',
  imports: [CommonModule],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss',
})
export class DefaultLoginLayoutComponent {
  #router = inject(Router);
  #dialog = inject(MatDialog);

  @Input() public titulo: string = '';
  @Input() public botaoEntrar: string = '';
  @Input() public botaoCadastrar: string = '';
  @Input() public disablebotaoCadastrar: boolean = true;
  @Output('Submit') public onSubmit = new EventEmitter();

  @Output('Navigate') public onNavigate = new EventEmitter();

  public submit() {
    this.onSubmit.emit();
  }

  public navigate() {
    this.onNavigate.emit();
  }

  openDialog(): void {
    this.#dialog.open(SelectRegisterDialogComponent, {
      panelClass: EDialogEnum.PROJETOS,
      data: 'Como você deseja se candidatar?',
    });
  }
}
