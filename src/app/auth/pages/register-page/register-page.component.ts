import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HeaderService } from '../../../shared/services/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent implements OnInit {
  

  constructor(private messageService: MessageService,
    private headerService: HeaderService) {}

  private fb = inject( FormBuilder )
  private router= inject(Router)

  private authService = inject(AuthService)

  public registerForm: FormGroup = this.fb.group({
    email:    ['',[Validators.required, Validators.email]],
    name:     ['',[Validators.required,Validators.minLength(3)]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  show(msg: string, severity:'success'|'info'|'error'): void {
    this.messageService.add(
      { severity: severity, 
        summary: 'Register',
      detail: msg });
}

  register(){
    const {username, password, email, name} = this.registerForm.value

    this.authService.register(username,password, email, name)
      .subscribe({
        next: () => {
          this.show('Usuario registrado','success')
          this.router.navigateByUrl('/home')
        },
        error: (error) => {
          this.show('Error al registrar el usuario','error')
        }
      })
  }

  ngOnInit(): void {
    this.headerService.setTitle('New Account', 'pi pi-user-plus')
  }
}
