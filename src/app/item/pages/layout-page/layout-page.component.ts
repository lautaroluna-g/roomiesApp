import { Component, Signal, computed, effect, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent{
  
  constructor(private authService: AuthService){}
  private router = inject(Router)
  private cookieService = inject(CookieService)

  public actualUser = this.authService.currentUser()?.username


  public onLogout(){
    this.authService.logout()
  }

  public authStatusChangedEffect = effect( ()=> {

    switch( this.authService.authStatus()){
      
      case AuthStatus.checking:
        return;
      
      case AuthStatus.authenticated:
        this.router.navigateByUrl(
          this.cookieService.get('url'))
          break;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login')
        break;
    };
  })

}
