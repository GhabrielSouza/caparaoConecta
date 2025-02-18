import { Component, Input } from '@angular/core';
import { TInputType } from '../../types/TInputType.type';

@Component({
  selector: 'app-primary-input',
  imports: [],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss',
})
export class PrimaryInputComponent {
  @Input() public type: TInputType = 'text';
  @Input() public inputName: string = '';
  @Input() public placeholder: string = '';
  @Input() public label: string = '';

  value: string = '';
}
