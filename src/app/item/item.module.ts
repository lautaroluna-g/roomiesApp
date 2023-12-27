import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module'
import { FormsModule }    from '@angular/forms';;

import { ItemRoutingModule } from './item-routing.module';

import { ListPageComponent } from './pages/list-page/list-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemImagePipe } from './pipes/item-image-pipe.component';


@NgModule({
  declarations: [
    ListPageComponent,
    LayoutPageComponent,
    ItemCardComponent,
    ItemImagePipe
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    PrimeNgModule,
    FormsModule
  ]
})
export class ItemModule { }
