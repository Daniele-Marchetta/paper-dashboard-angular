import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [ RouterModule, CommonModule,ReactiveFormsModule ],
    declarations: [ LoginComponent ],
    exports: [ LoginComponent ]
})

export class LoginModule {}
