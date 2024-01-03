import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit {

  public title = '';
  public icon = " "
  public actualUser: any = null
  public isHome:boolean = false
  
  private headerService = inject(HeaderService)
  private cdr= inject(ChangeDetectorRef)

  private authService = inject(AuthService)
  
  onclick():void{
    console.log('hago click')
  }

  ngOnInit() {
    this.headerService.title.subscribe(({title,icon}) => {
      this.isHome = title ==='Home'
      this.title = title;
      this.icon = icon
      this.cdr.detectChanges()
    });

    this.headerService.actualUser
    .subscribe( newUser => {
      this.actualUser = newUser?.username
    })

    this.actualUser = this.authService.currentUser()
    console.log('user', this.actualUser)
  }

  public onLogout(){
    this.authService.logout()
  }

  


  
   
}
