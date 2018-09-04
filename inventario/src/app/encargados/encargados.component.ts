import { Component, OnInit } from '@angular/core';
import { Encargado } from './encargado';
import { EncargadoService } from './encargado.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-encargados',
  templateUrl: './encargados.component.html',
  
})
export class EncargadosComponent implements OnInit {

  encargados: Encargado[];

  constructor(private encargadoService: EncargadoService) { }

  ngOnInit() {
     this.encargadoService.getEncargados().subscribe(
       (encargados) => {
         this.encargados = encargados
         }
     );
  }

  delete(encargado: Encargado): void {

   /* const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    })
    
    swalWithBootstrapButtons({
      title: 'ESTA SEGUR@"?',
      text: "SEGUR@ QUE DESEA ELIMINAR AL ENCARGADO ${encargado.nombre} ${encargado.apellido}?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.encargadoService.delete(encargado.id).subscribe(
          response =>{
            this.encargados = this.encargados.filter(cli => cli !== encargado)
            swalWithBootstrapButtons(
              'Encargado  Eliminado!',
              `Encargado ${encargado.nombre} eliminado con exito. `,
              'success'
            )
          }
        )
        
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })*/

    swal({
      title: 'ESTA SEGUR@"?',
      text: `SEGUR@ QUE DESEA ELIMINAR AL ENCARGAD@ ${encargado.nombre} ${encargado.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminar !'
    }).then((result) => {
      this.encargadoService.delete(encargado.id).subscribe(
        response => {
          this.encargados = this.encargados.filter(cli => cli !== encargado)
          swal(
            'Encargado  Eliminado!',
            `Encargado ${encargado.nombre} eliminado con exito. `,
            'success'
          )
        }
      )
    })
      
   
  }

}
