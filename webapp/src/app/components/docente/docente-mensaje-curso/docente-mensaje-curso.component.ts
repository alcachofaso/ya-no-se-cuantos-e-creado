import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-docente-mensaje-curso',
  templateUrl: './docente-mensaje-curso.component.html',
  styleUrls: ['./docente-mensaje-curso.component.css']
})
export class DocenteMensajeCursoComponent implements OnInit {

  
  public alumnos : string[];
  public alumno : string[];
  public _alumnos : string[];
  public mensajes : string[];

  public id : string;
  public nombre : string;
  public identificador : string;
  public alertMensaje : string;
  public cantAlumnosMensaje : string;
  public titulo : string;
  public contenido : string;
  public titulo2 : string;
  public contenido2 : string;
  public cantidadAlumnosApoderado : string;
  public alumnoSelect : string;
  public mensAnota : string;

  public cantidadAlumnos : number;

  public fmensajes : boolean;
  public falumnosApoderados : boolean;
  public ferror : boolean;
  public fok : boolean;
  public fok2: boolean;
  public ferror2 : boolean;
  public falumSelect : boolean; // por si hay alumnos seleccionados, ser muestra listado
  public falumRestantes : boolean; // por si quedan alumnos para seleccionar


  constructor(private router : Router, private auth : AuthService) { 
    this.mensajes = new Array();
    this.fmensajes = false;
    this.falumnosApoderados = false;
    this.ferror = false;
    this.ferror2 = false;
    this.fok = false;
    this.fok2 = false;
    this.falumSelect = false;
    this.falumRestantes = true;
    this.alumnos = new Array();
    this.alumno = new Array();

    auth.datosCursoaCargo().subscribe(r=>{
        this.id = r['id'];
        this.nombre = r['name'];
        this.identificador = r['identifier'];

        auth.cantidadAlumnosApoderado(this.id).subscribe(r=>{
          this.cantidadAlumnosApoderado = r['respuesta'];
          if(this.cantidadAlumnosApoderado == '300'){
            this.obtenerALumnos();
          }else{
            this.cantidadAlumnosApoderado = "Ningún alumno tiene asociado un apoderado";
            this.falumnosApoderados = true;
          }
          
        })
    })
    auth.mensajesCursoaCargo().subscribe(r=>{
      for(let t of r){
        this.mensajes.push(t);
      };
      console.log("Cantidad de mensajes " + this.mensajes.length);
      if(this.mensajes.length == 0){
        this.alertMensaje = "Me tienes mensajes enviados";
        this.fmensajes = true;
      }
    });
  }

  obtenerALumnos(){
    this.auth.listadoAlumnosApoderado(this.id).subscribe(r=>{
      for(let t of r){
        this.alumnos.push(t);
      }
    })
  }

  enviarMensajeCurso(){
    this.esconder();
    if(this.titulo != undefined && this.contenido != undefined){

      this.auth.enviarMensajeEspecifico(this.titulo,this.contenido,'1','0').subscribe(r => {
        for(let n of this.alumnos){
          this.auth.enviarMensajeEspecificoAlumnosGetId(n['studentID']).subscribe(result2=>{

            this.auth.enviarMensajeEspecificoAlumnos(n['studentID'],r['mensajeID'], result2['roleId']).subscribe(result3 => {
              if(!this.fok)
                this.fok=true;
            })
          });
        }
      });
      this.titulo = "";
      this.contenido = "";
    }else{
      this.ferror = true;
    }
  }

  enviarMensajeEspecifico(){
    this.esconder();
    if(this.titulo2 != undefined && this.contenido2 != undefined && this.alumno.length > 0 && this.mensAnota != undefined){
      this.auth.enviarMensajeEspecifico(this.titulo2,this.contenido2,'2',this.mensAnota ).subscribe(r => {
        for(let n of this.alumno){
          this.auth.enviarMensajeEspecificoAlumnosGetId(n['studentID']).subscribe(result2=>{
          this.auth.enviarMensajeEspecificoAlumnos(n['studentID'],r['mensajeID'], result2['roleId']).subscribe(result3 => {
            if(!this.fok2)
                {this.fok2=true;}
          })
          });
        }
        this.alumno = new Array();
      });

      this.titulo2 = "";
      this.contenido2 = "";
      this.obtenerALumnos();
      this.falumRestantes = true;
    }else{
      this.ferror2 = true;
    }
  }


  agregarAlumno(){
    this.esconder();
    if(this.alumnoSelect!= undefined){
      this.falumSelect = true;
        this._alumnos = new Array();
        for(let t of this.alumnos){
          if(t['studentID'] == this.alumnoSelect){
            this.alumno.push(t);
          }else{
            this._alumnos.push(t);
          }
        }
        this.alumnos = new Array();
        this.alumnos = this._alumnos;
      }
      if(this.alumnos.length == 0){
        this.falumRestantes = false;
      }
  }

  eliminarAlumno(value : string){
      this._alumnos = new Array();
      for(let t of this.alumno){

        if(t['studentID'] == value){
          this.alumnos.push(t);
        }else{
          this._alumnos.push(t);
        }
      }
      this.alumno = new Array();
      this.alumno = this._alumnos;
    if(this.alumno.length == 0){
      this.falumSelect = false;
    }
    if(this.alumnos.length == 1){
      this.falumRestantes = true;
    }
  }

  detalle(value : string){
    this.router.navigate(["/docente/docente/Mensajes/detalle/", value]);
  }

  esconder(){
    this.fok = false;
    this.fok2 = false;
    this.ferror = false;
    this.ferror2 = false;
  }

  ngOnInit() {
  }

}
