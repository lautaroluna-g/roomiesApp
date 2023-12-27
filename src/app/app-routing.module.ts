import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path:'auth',
    canActivate:[isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'item',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./item/item.module').then(m => m.ItemModule),
  },
  {
    path:'404',
    component: Error404PageComponent,
  },
  {
    path:'',
    redirectTo: 'item',
    pathMatch: 'full',
  },
  {
    path:'**',
    redirectTo: '404'
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
