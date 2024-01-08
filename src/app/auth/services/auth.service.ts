import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { environments } from '../../../environments/environments';
import { AuthStatus } from '../interfaces/auth-status.interface';
import { CheckTokenResponse, LoginResponse, RegisterResponse } from '../interfaces';
import {  map, Observable, catchError, throwError, of , tap} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from '../../shared/services/header.service';

@Injectable({providedIn: 'root'})
export class AuthService {

  private readonly baseUrl: string = environments.baseURL
  private httpClient = inject(HttpClient)
  // private cookieService = inject(CookieService)
  private headerService = inject(HeaderService)

  private _currentUser = signal<User|null>(null)
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)


  // Para que lo puedan ver desde afuera pero no modificarlo
  public currentUser = computed ( () => {
      console.log('DEL SERVICIO',this._currentUser()) 
      this._currentUser()
    })
  public authStatus = computed( () => this._authStatus())

  constructor() {
    this.checkAuthStatus().subscribe()
  }

  private setAuthentication(user:User, token:string): boolean {
    console.log('USUARIO', user)
    this._currentUser.set(user)
    this._authStatus.set(AuthStatus.authenticated)
    this.headerService.setUser(user)
    // this.cookieService.set('token',token, { secure:true})
    localStorage.setItem('token', token)
    return true
  }


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
  private request(url:string, body:any): Observable<boolean>{
    return this.httpClient.post<RegisterResponse>(url,body)
    .pipe(
      // tap(({user,token}) => {console.log('USUARIO DESDE TAP ', user)}),
      map( ({user,token}) => this.setAuthentication(user,token)),
      catchError( (err) => {
        return throwError(() => err)
      })
    )
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`
    // const token = this.cookieService.get('token')
    const _token = localStorage.getItem('token')
    
    // console.log('TOKEN ', token);
    
    if (!_token) {
      this.logout()
      return of(false)
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ _token }`)
      .set('Content-Type', 'application/json')

    return this.httpClient.get<CheckTokenResponse>(url,{ headers })
      .pipe(
        tap(({user,token}) => {console.log('USUARIO DESDE CHECKAUTH ', user)}),
        map( ({user,token}) => this.setAuthentication(user,token)),
        catchError( () => {
          this._authStatus.set(AuthStatus.notAuthenticated)
          return of(false)
        })
      )
  }

  logout(){
    // this.cookieService.deleteAll()
    localStorage.removeItem('token')
    this._currentUser.set(null)
    // this.headerService.setUser(null)
    this._authStatus.set(AuthStatus.notAuthenticated)
  }

}