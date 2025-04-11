import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TInputType } from '../../../types/TInputType.type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-genero-input',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './genero-input.component.html',
  styleUrl: './genero-input.component.scss',
  providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => GeneroInputComponent),
          multi: true,
        },
      ],
})
export class GeneroInputComponent implements ControlValueAccessor{
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
