import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HeaderService } from '../../../shared/services/header.service';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent implements OnInit {
  

  constructor(
    private messageService: MessageService,
    private headerService: HeaderService,
    private validatorsService:ValidatorsService) {}

  private fb = inject( FormBuilder )
  private router= inject(Router)

  private authService = inject(AuthService)

  public registerForm: FormGroup = this.fb.group({
    email:    ['',[Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    name:     ['',[Validators.required,Validators.minLength(3), Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    username: ['', [Validators.required,Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  }, {
    Validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  })

  show(msg: string, severity:'success'|'info'|'error'): void {
    this.messageService.add(
      { severity: severity, 
        summary: 'Register',
      detail: msg });
  }

  public isValidField(field:string){
    return this.validatorsService.isValidField(this.registerForm, field)
  }

  register(){

    this.registerForm.markAllAsTouched()
  
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
