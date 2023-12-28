import { Component, OnInit, inject } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces';
import { BehaviorSubject, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit {

  public title = '';
  public icon = " "
  public actualUser = null
  
  private headerService = inject(HeaderService)

  private authService = inject(AuthService)
  
  onclick():void{
    console.log('hago click')
  }

  ngOnInit() {
    this.headerService.title.subscribe(({title,icon}) => {
      this.title = title;
      this.icon = icon
    });

    this.headerService.actualUser
    .subscribe( newUser => {
      this.actualUser = newUser?.username
    })
  }

  public onLogout(){
    this.authService.logout()
  }

  


  
   
}
