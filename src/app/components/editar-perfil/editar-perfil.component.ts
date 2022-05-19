import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Empresas } from 'src/app/models/empresas.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
    providers: [  UsuarioService, SucursalesService, EmpresasService]

})
export class EditarPerfilComponent implements OnInit {

  public token
  public identidad;
  public empresaModelId: Empresas;



  constructor(
    public _activatedRoute: ActivatedRoute,
    public _usuarioService: UsuarioService,
    private _empresasService: EmpresasService,
    private _router: Router,

     private userRest: UsuarioService) {

  //this.productoModelGet = new Productos('','','',0,0,'');

  this.empresaModelId = new Empresas('','','','','','','');
  this.token = this._usuarioService.obtenerToken();
  this.identidad = this._usuarioService.obtenerIdentidad();


   }

   public idEmpresa;
  ngOnInit(): void {

    
    this.identidad = this._usuarioService.obtenerIdentidad();
    //console.log(" Ejemplificacion" +this.identidad.nombre)

    this._activatedRoute.paramMap.subscribe((dataRuta)=>{

      this.idEmpresa = dataRuta.get('idEmpresa')
      this.getEmpresaId(this.idEmpresa)
      

    })
  }

  getEmpresaId(idEmpresa){
    this._empresasService.ObtenerUsuariosId(idEmpresa, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.empresaModelId = response.empleadoEncontrado;

        //console.log(response.empleadoEncontrado);

        //console.log(response);
        
        //console.log(this.empresaModelId);

      },
      (error)=>{
        //console.log(<any>error)
      }
    )
  }

  putEmpresa(){
    this._empresasService.EditarUsuarios(this.empresaModelId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        //console.log(response);
        //console.log("response"+response.empresa)

        localStorage.setItem("identidad", JSON.stringify(response.empresa))

        
        //console.log("Conversion -"+ this._usuarioService.obtenerIdentidad())

        Swal.fire({
          icon: 'success',
          text: 'Datos editados con éxito',
        })
        this.getEmpresaId(this.idEmpresa)
        this.identidad = this._usuarioService.obtenerIdentidad();

      },
      (error)=>{
        //console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          footer: 'Ingrese los datos de nuevo'
        })
        this.getEmpresaId(this.idEmpresa)
      }
    )
  }


  deleteEmpresa() {
    Swal.fire({
     title: '¿Está seguro que desea eliminar la empresa?',
     text: "Este usuario será eliminado permanentemente",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: '¡Si, estoy seguro!'
   }).then((result) => {
     if (result.isConfirmed) {
       this._empresasService.EliminarUsuarios(this.idEmpresa, this.token).subscribe(
         (response)=>{

           Swal.fire(
             '¡Eliminado!',
             'El usuario fue eliminado con éxito',
             'success'
           )
           localStorage.clear()
           this._router.navigate(['/inicio']);
         },
         (error)=>{
           Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: error.error.message,
           })
   
         }
       )
       
     }
   })
   
 }

 logOut(){
  localStorage.clear()
}


  // getEmpresaId(idEmpresa){
  //   this._empresasService.ObtenerUsuariosId(idEmpresa, this._usuarioService.obtenerToken()).subscribe(
  //     (response) => {
  //       this.empresaModelId = response.empleadoEncontrado;
  //       //console.log(response);
  //       //console.log(this.empresaModelId);
  //     },
  //     (error)=>{
  //       //console.log(<any>error)
  //     }
  //   )
  // }

 
}
