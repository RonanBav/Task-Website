import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completePipe'
})
export class CompletePipePipe implements PipeTransform {

  transform(value: boolean): string {
    
    return  value ? "Completed" : "Not Completed";

    
  }

}
