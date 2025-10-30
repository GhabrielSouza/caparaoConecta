import { Component, HostListener, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button-return-top',
  imports: [NgClass],
  templateUrl: './button-return-top.component.html',
  styleUrl: './button-return-top.component.scss',
})
export class ButtonReturnTopComponent {
  @Input() icon?: string = 'assets/icons/arrow-top.svg';
  @Input() text: string = '';

  @Input() disabled: boolean = false;

  windonwsScrollY = window.scrollY;

  @HostListener('window:scroll', ['$event']) onscroll() {
    this.windonwsScrollY = window.scrollY;
  }

  @HostListener('click') onReturnTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
