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
  @Input() fonte: string = '';
  @Input() color: string = '';
  @Input() route: string = '';
  @Input() textColor: string = '';
  @Input() disabled: boolean = false;

  constructor(private router: Router) {}

  navigate() {
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }
}
