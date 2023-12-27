import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';



@NgModule({
  declarations: [
    Error404PageComponent,
    HomePageComponent
  ],
  imports: [
  ],
  exports: [
    Error404PageComponent,
    HomePageComponent
  ]
})
export class SharedModule { }
