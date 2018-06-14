import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-enviados',
  templateUrl: './enviados.component.html',
  styleUrls: ['./enviados.component.css']
})
export class EnviadosComponent implements OnInit {

  public mensajes : string[];
  public cursos : string[];
  public alumnos : string[];

  public curso : string;
  public alumno : string;
  public titulo : string;
  public contenido : string;

  public frecibido : boolean ;
  public fcursos : boolean ; // sin cursos
  public falumnos : boolean ; // sin alumnos
  public fok : boolean; //por si el mensaje se envia correctamente

  constructor(private auth : AuthService) { 
    this.mensajes = new Array();
    this.frecibido = false;
    this.fcursos = false;
    this.falumnos = false;
    this.fok = false;
    this.obtenerCursos();

    auth.ObtenerMensajesEnviados().subscribe(r=>{
      for(let m of r){
        this.mensajes.push(m);
      }
      if(this.mensajes.length!=0){
        this.frecibido = true;
      }
    })
  }

  obtenerCursos(){
    this.cursos = new Array();
    this.auth.obtenerCursosConApoderados().subscribe(r=>{
      for(let m of r){
        this.cursos.push(m);
      }
      if(this.cursos.length!=0){
        this.falumnos = true;
      }
    })
  }

  buscarAlumnos(){
    this.obtenerAlumnos();
  }

  obtenerAlumnos(){
    this.alumnos = new Array();
    this.auth.listarEstudiantes(this.curso).subscribe(r=>{
      for(let m of r){
        this.alumnos.push(m);
      }
      if(this.alumnos.length!=0){
        this.falumnos = true;
      }
    })
  }

  agregar(){
    this.fok = false;
    if(this.titulo != undefined && this.contenido != undefined && this.curso != undefined && this.alumno != undefined){
      this.auth.enviarMensajeEspecifico(this.titulo,this.contenido,'2',this.auth.getRoleType).subscribe(r=>{
        this.auth.enviarMensajeEspecificoAlumnosGetId(this.alumno).subscribe(c=>{
          this.auth.enviarMensajeEspecificoAlumnos(this.alumno,r['mensajeID'],c['roleId']).subscribe(r=>{
            this.fok = true;
          });
        });
      });
    }
  }

  esconder(){
    this.fok = false;
  }

  ngOnInit() {
  }

}
