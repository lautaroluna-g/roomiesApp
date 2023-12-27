import { Component, OnInit, computed, effect, inject} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{

  private authService = inject(AuthService)
  private router = inject(Router)
  private cookieService = inject(CookieService)

  constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

  public finishedAuthCheck = computed<boolean>(()=>{
    if (this.authService.authStatus() === AuthStatus.checking){
      return true
    }
    return false
  })

  public authStatusChangedEffect = effect( ()=> {
    
    console.log('cambia')
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
