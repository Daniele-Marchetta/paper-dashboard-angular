import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ RegisterComponent ],
    exports: [ RegisterComponent ]
})

export class RegisterModule {}
