import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { environments } from '../../environments/envionments';
import { AuthStatus } from '../interfaces/auth-status.interface';
import { LoginResponse, RegisterResponse } from '../interfaces';
import { tap, map, Observable, catchError, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({providedIn: 'root'})
export class AuthService {

  private readonly baseUrl: string = environments.baseURL
  private httpClient = inject(HttpClient)
  private cookieService = inject(CookieService)

  private _currentUser = signal<User|null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)


  // Para que lo puedan ver desde afuera pero no modificarlo
  public currentUser = computed ( () => this._currentUser)
  public authStatus = computed( () => this._authStatus)

  constructor() {}


  login(username:string, password:string): Observable<boolean>{
    
    const url = `${ this.baseUrl }/auth/login`
    const body = {username, password}

    return this.request(url,body)
  }


  register(username:string, password:string, email: string, name: string): Observable<boolean>{
    
    const url = `${ this.baseUrl }/auth/register`
    const body = {name, username, email, password}
    console.log(JSON.stringify(body))
    return this.request(url, body)
    
  }

  // todo: definir tipo de body
  request(url:string, body:any): Observable<boolean>{
    return this.httpClient.post<RegisterResponse>(url,body)
    .pipe(
      tap( ({user,token}) => {
        this._currentUser.set(user)
        this._authStatus.set(AuthStatus.authenticated)
        this.cookieService.set('token',token, { secure:true })
      }),

      map( () => true),

      catchError( (err) => {
        return throwError(() => err)
      })
     
    )

  }

  
  
  
}