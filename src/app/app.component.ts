import { Component, OnInit, computed, effect, inject} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{

  private authService = inject(AuthService)


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
}
