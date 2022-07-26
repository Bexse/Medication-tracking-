import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'refilldate'
})
export class RefilldatePipe implements PipeTransform {

  transform(value: number, date: Date): any {
   date = new Date(date);
   date.setDate(date.getDate() + value)
    return date;
  }

}
