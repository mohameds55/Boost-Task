import { Pipe, PipeTransform } from '@angular/core';

type TransformType = 'capitalize' | 'uppercase' | 'lowercase' | 'titlecase';

@Pipe({
  name: 'textTransform',
})
export class TextTransformPipe implements PipeTransform {
  transform(value: string | null | undefined, type: TransformType = 'titlecase'): string {
    if (!value) {
      return '';
    }

    switch (type) {
      case 'capitalize':
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      case 'uppercase':
        return value.toUpperCase();
      case 'lowercase':
        return value.toLowerCase();
      case 'titlecase':
        return value
          .toLowerCase()
          .replace(/[_-]+/g, ' ')
          .split(' ')
          .filter(word => word.length > 0)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      default:
        return value;
    }
  }
}
