import { Component, Signal, computed } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent{
  
  constructor(private authService: AuthService){}

  public actualUser = this.authService.currentUser()?.username


  public onLogout(){
    console.log(this.actualUser)
    this.authService.logout()
  }

}
