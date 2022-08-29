import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateConvert'
  })
export class dateConversion implements PipeTransform {
  transform(date: Date) {
    if (date) {
        return new Date(date).toLocaleDateString();
    }
    return date;
  }
}
