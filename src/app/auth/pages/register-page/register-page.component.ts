import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  

  constructor(private messageService: MessageService) {}

  private fb = inject( FormBuilder )

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
        next: () => this.show('Usuario registrado','success'),
        error: (error) => {
          this.show('Error al registrar el usuario','error')
        }
      })
  }
}
