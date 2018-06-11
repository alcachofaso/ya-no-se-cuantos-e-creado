import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-docente-tarea-trabajo',
  templateUrl: './docente-tarea-trabajo.component.html',
  styleUrls: ['./docente-tarea-trabajo.component.css']
})
export class DocenteTareaTrabajoComponent implements OnInit {

  public cursos : string[];
  public asignaturas : string[]


  public curso: string;
  public asignaturaId : string;

  public titulo : string;
  public Contenido : string;
  public mensaje : string;

  public fasignado : boolean;
  public fok : boolean;
  public ferror : boolean;
  public fecha : string;

  constructor(private auth : AuthService) {
    this.fasignado = false;
    this.fok = false;
    this.ferror = false;
    this.cursos = new Array();
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
    this.asignaturas = new Array();
    if(value != undefined){
      this.auth.listadoAsignaturasDadasDocente(value).subscribe(r=>{
      for(let m of r){
        this.asignaturas.push(m);
      }
      })
    }
  }

  publicarTarea(){
    if(this.titulo != undefined && this.Contenido != undefined && this.curso!= undefined && this.asignaturaId != undefined){
      this.auth.publicarTrabajo(this.titulo,this.Contenido,this.fecha,this.asignaturaId,this.curso).subscribe(r=>{
        this.titulo = null;
        this.Contenido = null;
        this.fecha = null;
      })
    }
  }

  cambio(){
    this.obtenerAsignaturas(this.curso);
  }
  esconder(){
    this.fok = false;
    this.ferror = false;
  }

  ngOnInit() {
  }

}
