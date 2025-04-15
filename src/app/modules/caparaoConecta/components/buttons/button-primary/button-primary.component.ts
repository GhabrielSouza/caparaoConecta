import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-primary',
  imports: [CommonModule],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.scss',
})
export class ButtonPrimaryComponent {
  @Input() icon?: string;
  @Input() text: string = '';
  @Input() fonte: string = 'hypnosText--TituloGrande';
  @Input() color: string = 'btn-success';
  @Input() route: string = '';
  @Input() textColor: string = 'hdk-creme';

  constructor(private router: Router) {}

  navigate() {
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }
}
