import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [DatePipe, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public data = signal(new Date());

  @Input() tela: string = '';
}
