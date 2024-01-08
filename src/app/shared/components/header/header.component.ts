import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterModule } from '@angular/router';
import { User } from '../../../auth/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit {

  public title = '';
  public icon = " "
  public actualUser: string|undefined

  public isHome:boolean = false
  
  private headerService = inject(HeaderService)
  private cdr= inject(ChangeDetectorRef)

  private authService = inject(AuthService)

  ngOnInit() {
    this.headerService.title.subscribe(({title,icon}) => {
      this.isHome = title ==='Home'
      this.title = title;
      this.icon = icon
      this.cdr.detectChanges()
    });

    this.actualUser = this.authService.currentUser()?.username

    this.headerService.actualUser
    .subscribe( newUser => {
      this.actualUser = newUser?.username
    })

    console.log(this.actualUser);


  public onLogout(){
    this.authService.logout()
  }

  


  
   
}
