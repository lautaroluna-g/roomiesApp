import { Injectable, Signal, computed, effect, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../auth/interfaces';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _title = new BehaviorSubject('Initial title');
  private _actualUser: BehaviorSubject<any> = new BehaviorSubject<User|null>(null);
 
  setTitle(title: string) {
    this._title.next(title);
  }

  setUser(user: User|null) {
    this._actualUser.next(user);
  }

  public get title() : BehaviorSubject<string> {
    return this._title
  }

  public get actualUser() {
    return this._actualUser
  }
  
}
