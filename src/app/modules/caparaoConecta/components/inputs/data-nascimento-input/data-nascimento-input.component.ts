import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { TInputType } from '../../../types/TInputType.type';


@Component({
  selector: 'app-data-nascimento-input',
  imports: [MatFormFieldModule, MatInputModule, NgxMaskDirective],
  templateUrl: './data-nascimento-input.component.html',
  styleUrl: './data-nascimento-input.component.scss',
  providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DataNascimentoInputComponent),
        multi: true,
      },
    ],
})
export class DataNascimentoInputComponent implements ControlValueAccessor{
  @Input() public type: TInputType = 'text';
  @Input() public inputName: string = '';
  @Input() public placeholder: string = '';
  @Input() public label: string = '';

  value: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  updateValue(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}
}
