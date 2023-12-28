import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { HeaderService } from '../../../shared/services/header.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent implements OnInit{

  constructor(private messageService: MessageService,
      private headerService: HeaderService) {}

  private fb = inject( FormBuilder )
  private authService = inject(AuthService)
  private router = inject(Router)

  public loginForm: FormGroup = this.fb.group({
    username: ['lunalauti', [Validators.required]],
    password: ['lau12345', [Validators.required, Validators.minLength(6)]]
  })

  show(msg: string, severity:'success'|'info'|'error'): void {
    this.messageService.add(
      { severity: severity, 
        summary: 'Login',
      detail: msg });
}

  login(){
    const {username, password} = this.loginForm.value

    this.authService.login(username,password)
      .subscribe({
        next: () => {
          this.show('Logueado!','success')
          this.router.navigateByUrl('/item')},
        error: () => {
          this.show('Error al iniciar sesion','error')
        }
      })
  }

  ngOnInit(): void {
    this.headerService.setTitle('Login','pi pi-user')
  }
}
