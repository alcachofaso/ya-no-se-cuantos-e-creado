import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-curso-listar',
  templateUrl: './curso-listar.component.html',
  styleUrls: ['./curso-listar.component.css']
})
export class CursoListarComponent implements OnInit {
  public listado: string[];
  public fResultado : boolean;
  public mensage : string;

  constructor(public auth : AuthService,public route:Router) {
    this.inicio();
    this.fResultado = false;
   }

  private inicio(){
    
    this.listado = new Array();
    if(this.auth.getRoleType == '0'){
      this.auth.listarCursos().subscribe(result=>{
        for(var a of result)
      {
        this.listado.push(a);
      }
      }),error => {
        console.log(<any>error);
      }
    }
   }

  ngOnInit() {
  }
  eliminarCurso(value : string, value2 :string){
    if(value!=null){
      var ids :string[];
      ids = new Array();
      this.auth.eliminarEstudiantes(value).subscribe(result=>{});
      this.auth.eliminarCurso(value).subscribe(result=>{
            var m = result.respuesta;
            if(m ==100){
              this.mensage="Error al eliminar a los estudiantes, intentelo nuevamente";
              this.fResultado = true;
            }else{
              if(m == 200){
                this.mensage="";
                this.fResultado = true;
                this.inicio();
                this.route.navigate(["/Institucion/institucion/Cursos/Listado"]);
              }
            }
    })
  }
}

editarCurso(value :string){
  this.route.navigate(["/Institucion/institucion/Cursos/editar/", value]);
}
  esconder(){
    this.fResultado = false;
    this.mensage = "";
  }



}
