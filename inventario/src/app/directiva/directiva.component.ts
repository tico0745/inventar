import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  
})
export class DirectivaComponent  {
  listaHerramienta: string[]=['Construccion','electricidad','plomeria','pintura'];
  habilitar: boolean = true;
  constructor() { }
  
  setHabilitar(): void {
    this.habilitar = (this.habilitar==true)? false: true;
  }

 
}
