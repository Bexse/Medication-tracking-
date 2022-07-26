import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], input:any): any {
    if (input) {
      return value.filter((item: any) =>
        item.medicationName.toLowerCase().includes(input)
      );
    } else {
      return value;
    }
  }
}
