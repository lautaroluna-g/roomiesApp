import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {


    public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
    public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

    public isValidField(formGroup: FormGroup,  field: string){
        if(field == 'password2' && formGroup.controls[field].touched && formGroup.controls['password'].touched){
            return formGroup.controls[field].value !== formGroup.controls['password'].value
        }
        return formGroup.controls[field].errors 
        && formGroup.controls[field].touched
    }
        
    // getFieldError( formGroup: FormGroup, field: string ): string | null {

    //     if ( !formGroup.controls[field] ) return null;
    
    //     const errors = formGroup.controls[field].errors || {};
    
    //     for (const key of Object.keys(errors) ) {
    //       switch( key ) {
    //         case 'required':
    //           return 'Este campo es requerido';
    
    //         case 'minlength':
    //           return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
    //       }
    //     }
    
    //     return null;
    //   }
    

    public isFieldOneEqualFieldTwo(field1:string, field2:string){
        return (formGroup: AbstractControl): ValidationErrors|null => {

            const fieldValue1 = formGroup.get(field1)?.value
            const fieldValue2 = formGroup.get(field1)?.value

            if(fieldValue1 !== fieldValue2){
                formGroup.get(field2)?.setErrors({ notEqual:true })
                return { notEqual:true}
            }

            formGroup.get(field2)?.setErrors(null)
            return null
        }
    }
}