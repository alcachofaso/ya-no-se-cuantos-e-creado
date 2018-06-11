import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-docente-notas',
  templateUrl: './docente-notas.component.html',
  styleUrls: ['./docente-notas.component.css']
})
export class DocenteNotasComponent implements OnInit {


  public asignaturas : string[]
  public cursos : string[];
  public alumnos : string[];
  public _alumnos : string[];
  public notas : string[];
  public _notas : string[];

  public alumno : string;

  public curso: string;
  public asignaturaId : string;
  public titulo : string;
  public description : string;
  public mensaje : string;
  public mensaje2 : string;
  
  public nota : number;

  
  public fasignado : boolean;
  public fCargado : boolean;
  public ferror : boolean;
  public ferror2 : boolean;

  constructor(private auth : AuthService) { 
    this.fasignado = false;
    this.fCargado = false;
    this.ferror = false;
    this.ferror2 = false;
    this.notas = new Array();
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

  agregarNota(){
    this.esconder();
    if(this.alumno!= undefined){
      if(this.nota >= 2 && this.nota <= 7 ){
        this._alumnos = new Array();
        for(let t of this.alumnos){

          if(t['id'] == this.alumno){
            this.notas.push(JSON.parse('{ "id":"'+t['id']+'", "name":"'+t['name']+'", "lastName":"'+ t['lastName'] +'", "nota":"'+this.nota +'"}'));
          }else{
            this._alumnos.push(t);
          }
        }
        this.alumnos = new Array();
        this.alumnos = this._alumnos;
        this._alumnos = new Array();
        this.alumno = null;
        this.nota= null;
      }else{
        this.mensaje2 = "La nota va de 2 a 7";
        this.ferror2 = true;
      }
    }else{
      this.mensaje2 = "Selecciona a un alumno";
      this.ferror2 = true;
    }
  }

  cambio(){
    this.obtenerAsignaturas(this.curso);
    this.alumnos = new Array()
    this.auth.obtenerListadoAlumnosCurso(this.curso).subscribe(r=>{
      for(let m of r){
        this. alumnos.push(m);
      }
    })
  }

  eliminarAlumno(id : string, nombre : string, apellido : string){
    this._notas = new Array();
    for (var g of this.notas)
    {
      if(g['id']!= id && g['name']!= nombre && g['lastName'] != apellido){
        this._notas.push(g);
      }
    }
    this.notas = new Array();
    this.notas = this._notas;
    this._notas = new Array();

    this. alumnos.push(JSON.parse('{ "id":"'+ id +'","rut":null, "name":"'+nombre+'", "lastName":"'+ apellido +'", "nota":"'+this.nota +'"}'));
  }

  cargarNotas(){
    this.esconder();
    if(this.notas.length > 0 && this.curso != undefined && this.asignaturaId != undefined && this.titulo != undefined && this.description != undefined){
      for(let t of this.notas){
        this.auth.publicarNotas(this.titulo,this.description,t['nota'],this.asignaturaId,t['id']).subscribe(r=>{
          if(!this.fCargado){
            this.mensaje = "Notas Cargadas Correctamente";
            this.fCargado = true;
            this.titulo = null;
            this.description = null;
            this.notas = new Array();
          }
        });
      }
    }else{
      this.mensaje = "Ingresa todos los datos necesarios";
      this.ferror = true;
    }
  }

  esconder(){
    this.fCargado = false;
    this.ferror = false;
    this.ferror2 = false;
  }



  cambioIdent(){
  }

  ngOnInit() {
  }

}
