import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AboutPageComponent } from './pages/about-page/about-page.component';



@NgModule({
  declarations: [
    Error404PageComponent,
    HomePageComponent,
    HeaderComponent,
    AboutPageComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterModule
  ],
  exports: [
    Error404PageComponent,
    HomePageComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
