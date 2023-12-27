import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'items-card',
  templateUrl: './item-card.component.html',
  styles: ``
})
export class ItemCardComponent {

  @Input()
  public item!: Item

  @Input()
  public checked: boolean = false

}
