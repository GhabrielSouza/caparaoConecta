import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }

    const textWithSpaces = value.replace(/_/g, ' ');

    return textWithSpaces.charAt(0).toUpperCase() + textWithSpaces.slice(1);
  }
}
