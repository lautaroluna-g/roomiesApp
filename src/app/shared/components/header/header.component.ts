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
  public actualUser = null
  
  private headerService = inject(HeaderService)
  
  constructor() {}

  ngOnInit() {
    this.headerService.title.subscribe(newTitle => {
      this.title = newTitle;
    });

    this.headerService.actualUser
    .subscribe( newUser => {
      this.actualUser = newUser?.username
    })
  }

  


  
   
}
