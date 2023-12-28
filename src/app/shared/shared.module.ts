import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    Error404PageComponent,
    HomePageComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule

  ],
  exports: [
    Error404PageComponent,
    HomePageComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
