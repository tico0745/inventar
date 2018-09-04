import { Component, OnInit } from '@angular/core';
import { Encargado } from './encargado'
import {EncargadoService} from './encargado.service'
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  private encargado: Encargado = new Encargado()
  private titulo:string = "Crear Encargado"

  constructor(private encargadoService: EncargadoService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarEncargado();
  }
  cargarEncargado(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id){
        this.encargadoService.getEncargado(id).subscribe(
          (encargado) => this.encargado = encargado)
      }
    })
  }

   create(): void  {
    this.encargadoService.create(this.encargado)
     .subscribe(encargado => {
       this.router.navigate(['/encargados'])
      swal('Nuevo encargado', `Encargado ${this.encargado.nombre} creado con éxito.!`, 'success')
    }
    );
  }
  /* public create(): void  {
    this.encargadoService.create(this.encargado).subscribe(
      response => this.router.navigate(['/encargados'])
      swal('Nuevo encargado',`Encargado ${this.encargado.nombre} creado con éxito`,'success')
    );
  }*/
 

  update(): void {
    this.encargadoService.update(this.encargado)
    .subscribe( encargado => {
      this.router.navigate(['/encargados'])
      swal('Encargado Actualizado', `Encargado ${encargado.nombre} actualizado con éxito!`, 'success')
    }
    )
  }

}
