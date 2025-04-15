import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-genero-input',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './genero-input.component.html',
  styleUrls: ['./genero-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GeneroInputComponent),
      multi: true,
    },
  ],
})
export class GeneroInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';

  value: string = '';
  disabled = false;

  // Funções do ControlValueAccessor
  onChange: any = () => {};
  onTouched: any = () => {};

  // Atualiza o valor quando a seleção muda
  onSelectionChange(event: { value: string }) {
    this.value = event.value;
    this.onChange(this.value);
    this.onTouched();
  }

  // Métodos do ControlValueAccessor
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}