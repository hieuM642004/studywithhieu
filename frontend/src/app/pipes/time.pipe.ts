// src/app/pipes/time.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: string | null, format: string = 'dd/MM/yyyy HH:mm:ss'): string {
    const formattedDate = this.datePipe.transform(value, format);
    return formattedDate || '';
  }
}
