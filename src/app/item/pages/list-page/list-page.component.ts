import { Component, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { ItemsService } from '../../services/item.service';
import { HeaderService } from '../../../shared/services/header.service';

@Component({
  selector: 'item-list-page',
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit{

  public items: Item[] = []

  constructor(private itemService: ItemsService,
      private headerService: HeaderService){}

  ngOnInit(): void {
    // this.itemService.getItems()
    // .subscribe(items => this.items = items)
    this.headerService.setTitle('Lists', 'pi pi-list');
    }
}

 