import { Component, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { ItemsService } from '../../services/item.service';

@Component({
  selector: 'item-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit{

  public items: Item[] = []

  constructor(private itemService: ItemsService ){}

  ngOnInit(): void {
    this.itemService.getItems()
    .subscribe(items => this.items = items)
  }





}
 