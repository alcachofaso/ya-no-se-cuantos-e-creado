import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-docente-listado-trabajo',
  templateUrl: './docente-listado-trabajo.component.html',
  styleUrls: ['./docente-listado-trabajo.component.css']
})
export class DocenteListadoTrabajoComponent implements OnInit {

  public trabajos : string[];
  public cursos : string[];
  public asignaturas : string[]

  public curso: string;
  public asignaturaId : string;
  public mensaje : string;

  public fasignado : boolean;
  public fok : boolean;

  constructor(private auth : AuthService) { 
    this.fasignado = false;
    this.cursos = new Array();
    this.fok = false;
    auth.listadoCurdosDadosDocente().subscribe(r=>{
      for(let m of r){
        this.cursos.push(m);
      }
      if(this.cursos.length!=0){
        this.fasignado = true;
      }
    })
  }

  
  obtenerAsignaturas(value : string){
    this.esconder();
    this.asignaturas = new Array();
    if(value != undefined){
      this.auth.listadoAsignaturasDadasDocente(value).subscribe(r=>{
      for(let m of r){
        this.asignaturas.push(m);
      }
      })
    }
  }

  esconder(){
    this.fok = false;
  }

  cambio(){
    this.obtenerAsignaturas(this.curso);
  }

  obtenerTrabajos(){
    this.trabajos = new Array();
    console.log(this.asignaturaId + "    " + this.curso);
    this.auth.listarTrabajo(this.asignaturaId, this.curso).subscribe(r=>{
      for(let t of r){
        this.trabajos.push(t);
      }
    })
  }

  eliminarTrabajado(value : string){
    this.auth.eliminarTrabajo(value).subscribe(r=>{
      this.obtenerTrabajos();
      this.mensaje = "tarea o trabajo eliminado correctamente";
      this.fok = true;
    })
  }



  ngOnInit() {
  }

}
