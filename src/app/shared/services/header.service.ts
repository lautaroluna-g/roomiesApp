import { Injectable, Signal, computed, effect, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../auth/interfaces';
import { AuthService } from '../../auth/services/auth.service';
import { headerParam } from '../interfaces/header.interface';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _title = new BehaviorSubject<headerParam>({title:'Initial title', icon:'box'});
  private _actualUser: BehaviorSubject<any> = new BehaviorSubject<User|null>(null);
 
  setTitle(title: string, icon: string) {
    this._title.next({title,icon});
  }

  setUser(user: User|null) {
    this._actualUser.next(user);
  }

  public get title() : BehaviorSubject<headerParam> {
    return this._title
  }

  public get actualUser() {
    return this._actualUser
  }
  
}
