import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { authResponse, registerRequest } from 'app/interfaces/authentication';
import { MyErrorResponse } from 'app/interfaces/errorResponces';
import { AuthService } from 'app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'register-cmp',
    templateUrl: 'register.component.html'
})

export class RegisterComponent{

  constructor(private authServ:AuthService,private router: Router  ) { }

  registerError:string='';
  isloading:boolean=false;



  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });


  onSubmit(){
    const obj:registerRequest = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      role:"GUEST"
      }
    this.doRegister(obj);

  }


  doRegister(registerObj: registerRequest) {
    this.isloading=true;
    this.authServ.register(registerObj).subscribe({
      next:(resp:HttpResponse<authResponse>)=>{
        const data:authResponse = { ...resp.body! }
        this.authServ.setToken(data.access_token);
      },
      error:(err:HttpErrorResponse)=>{
        const errore:MyErrorResponse|ProgressEvent = err.error;
        if(errore instanceof ProgressEvent || errore==null){
          this.registerError=err.message
        }else{
          this.registerError=errore.message;
        }
        this.isloading=false
      },
      complete: ()=>{
        this.isloading=false;
        this.registerError=''
        this.router.navigateByUrl("/home/registro")
      }
    }
    )
  }

  getMailErrorMessage() {
    if (this.registerForm.controls.email.hasError("required")) {
      return 'You must enter a value';
    }
    return this.registerForm.controls.email.hasError("email") ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.registerForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.registerForm.controls.password.hasError('minlength') ? 'Password lenght must be at least 8' : '';
  }

  getFirstNameErrorMessage() {
    if (this.registerForm.controls.firstName.hasError('required')) {
      return 'You must enter a value';
    }
  }

  getLastNameErrorMessage() {
    if (this.registerForm.controls.lastName.hasError('required')) {
      return 'You must enter a value';
    }
  }
}
