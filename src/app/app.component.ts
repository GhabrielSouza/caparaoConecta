import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from './modules/caparaoConecta/components/cabecalho/cabecalho.component';
import { AuthService } from './services/auth-caparao/login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.checkAuthStatus().subscribe();
  }
}
