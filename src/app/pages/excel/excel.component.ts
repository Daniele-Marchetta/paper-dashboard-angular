import { Component } from '@angular/core';

@Component({
    selector: 'excel-cmp',
    moduleId: module.id,
    templateUrl: 'excel.component.html'
})

export class ExcelComponent{
  isButtonClicked = false;

   handleButtonClick() {
    this.isButtonClicked = true;
    console.log('Il pulsante è stato premuto!');
  }}



