import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TInputType } from '../../../types/TInputType.type';

@Component({
  selector: 'app-cad-unico-radio',
  imports: [MatFormFieldModule, MatInputModule, MatRadioModule],
  templateUrl: './cad-unico-radio.component.html',
  styleUrl: './cad-unico-radio.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CadUnicoRadioComponent),
      multi: true,
    },
  ],
})
export class CadUnicoRadioComponent implements ControlValueAccessor {
  @Input() public type: TInputType = 'text';
  @Input() public inputName: string = '';
  @Input() public placeholder: string = '';
  @Input() public label: string = '';

  mostrarInput: boolean = false;

  value: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  updateValue(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
    this.onTouched();
  }

  updateMostrarInput(value: boolean) {
    this.mostrarInput = value;
    if (!value) {
      this.value = '';
    }
    this.onChange(this.value);
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
