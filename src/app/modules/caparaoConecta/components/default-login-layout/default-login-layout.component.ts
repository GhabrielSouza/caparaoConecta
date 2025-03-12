import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-login-layout',
  imports: [],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss',
})
export class DefaultLoginLayoutComponent {
  #router = inject(Router);

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

  public isRouterLogin() {
    return this.#router.url === '/login';
  }
}
