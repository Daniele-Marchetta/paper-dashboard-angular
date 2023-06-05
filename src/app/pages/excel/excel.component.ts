import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'excel-cmp',
    moduleId: module.id,
    templateUrl: 'excel.component.html'
})

export class ExcelComponent{
  constructor(private http: HttpClient) { }

  isButtonClicked = false;

   handleButtonClick() {
    this.isButtonClicked = true;
    console.log('Il pulsante è stato premuto!');
    this.http.get('http://localhost:8080/api/excel/registri').subscribe((response) => {
  // Handle the response from the API
  console.log(response);
});
  }


  downloadExcel() {
    this.http.get('http://localhost:8080/api/excel/registri', { responseType: 'blob' }).subscribe((response) => {
      // Creazione di un oggetto Blob dal contenuto della risposta
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Creazione di un URL oggetto temporaneo per il download del file
      const downloadUrl = URL.createObjectURL(blob);

      // Creazione di un elemento <a> nascosto per il download del file
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'file.xlsx';

      // Aggiunta dell'elemento <a> al DOM e simula il clic per il download del file
      document.body.appendChild(link);
      link.click();

      // Rimozione dell'elemento <a> dal DOM
      document.body.removeChild(link);
    });
  }
}



