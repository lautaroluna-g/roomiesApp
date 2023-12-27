import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'itemImage'
})

export class ItemImagePipe implements PipeTransform {

  transform(value: any, ...args: any[]) {
    // TODO
    throw new Error('unimplemented pipe')
  }

}
