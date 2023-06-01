import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authResponse, loginRequest } from 'app/interfaces/authentication';
import { MyErrorResponse } from 'app/interfaces/errorResponces';
import { AuthService } from 'app/services/authentication.service';
import { TokenInterceptorService } from 'app/services/token-interceptor.service';

@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: 'login.component.html'
})

export class LoginComponent{

  constructor(private authServ:AuthService, private tokenServ:TokenInterceptorService ,private router: Router  ) { }


  hide:boolean= true;
  loginError:string='';
  isloading:boolean=false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

   onSubmit(){
    console.log(this.loginForm.value.email)
    const obj:loginRequest = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }
    this.doLogin(obj);

  }


  doLogin(credentials:loginRequest){
    this.isloading=true;
    this.authServ.authenticate(credentials).subscribe({
      next:(resp:HttpResponse<authResponse>)=>{
        const data:authResponse = { ...resp.body! }
        this.authServ.setToken(data.access_token);
      },
      error:(err:HttpErrorResponse)=>{
        const errore:MyErrorResponse|ProgressEvent = err.error;
        if(errore instanceof ProgressEvent || errore==null){
          this.loginError=err.message
        }else{
          this.loginError=errore.message;
        }
        this.isloading=false
      },
      complete: ()=>{
        this.isloading=false;
        this.loginError=''
        this.router.navigateByUrl("/home/registro")
      }
    }
    )
  }

  getMailErrorMessage() {
    if (this.loginForm.controls.email.hasError("required")) {
      return 'You must enter a value';
    }
    return this.loginForm.controls.email.hasError("email") ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls.password.hasError('minlength') ? 'Password lenght must be at least 8' : '';
  }

}
