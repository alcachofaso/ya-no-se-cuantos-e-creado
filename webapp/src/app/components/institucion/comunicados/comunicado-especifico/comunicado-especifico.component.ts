import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service"; 

@Component({
  selector: 'app-comunicado-especifico',
  templateUrl: './comunicado-especifico.component.html',
  styleUrls: ['./comunicado-especifico.component.css']
})
export class ComunicadoEspecificoComponent implements OnInit {

  public titulo : string;
  public contenido : string;
  public flag : boolean;
  public flagError : boolean;
  public mensaje : string;
  public cursos : string[];
  public curso : string;
  public flagSinCursos: boolean;
  public identificadores : string[];
  public identificador : string;
  public fIdentificador : boolean;
  public alumnos : string[];///
  public __alumnos : string[];///
  public _alumnos : string;///
  public alumno : string[];///
  public _alumn : string[];
  public alumn : string[];
  public falumno : boolean;
  public fsinalumnos : boolean;
  public mensajeSinAlumnos : string;
  public cantidadAlumnos : number;

   constructor(public auth : AuthService) { 
    this.flag = false;
    this.flagError = false;
    this.flagSinCursos = false;
    this.fIdentificador = false;
    this.fsinalumnos = false;
    this.identificadores = new Array();
    this.alumno= new Array();
    this.alumn = new Array();
    this.cursos = new Array();
    this.alumnos = new Array();
    this.falumno = false;
    this.auth.listarCursosExistentes().subscribe(result=>{
      for(let m of result){
        this.cursos.push(m.name);
      }
    });
    if(this.cursos.length < 0)
    {
      this.flagSinCursos = true;
    }
  }

  enviar(){
    if(this.titulo.trim().length > 0 && this.contenido.trim().length > 0 && this.curso != null && this.identificador != null)
    {
      this.auth.enviarMensajeEspecifico(this.titulo, this.contenido,'2','0').subscribe(result =>{
          for(let n of this.alumn){
            this.auth.enviarMensajeEspecificoAlumnosGetId(n['studentID']).subscribe(result2=>{

              this.auth.enviarMensajeEspecificoAlumnos(n['studentID'],result['mensajeID'], result2['roleId']).subscribe(result3 =>{
                for(let k of result3){
                //  console.log(k);
                }
              })
            })
            
          }
        this.flag = true;
        this.titulo = "";
        this.contenido = "";
        this.alumn = new Array();
        this.fsinalumnos = false;
        this.alum();

      });
      
    }else{
      this.mensaje = "El mensaje deve contener un titulo, un contenidoy un destinatario."
      this.flagError = true;
    }
  }

  identi(){
    this.identificadores = null;
    this.identificadores = new Array();
    this.fIdentificador = false;
    this.auth.obtenerIdentificadores(this.curso).subscribe(result=>{
      for(let m of result){
        this.identificadores.push(m.identifier);
      }
    })
    this.fIdentificador = true;
  }

  alum(){
    this.alumnos = null;
    this.alumnos = new Array();
    this.falumno = false;
    this.fsinalumnos = false;
    var a;
    this.auth.obtenerAlumnos(this.curso,this.identificador).subscribe(result=>{
      for(let m of result){
        if(m.studentID != undefined)
        {
          this.alumnos.push(m);
        }
      }
      this.cantidadAlumnos = Number(this.alumnos.length);
      if(this.alumnos.length<1)
      {
        this.mensajeSinAlumnos = "Este Curso no tiene Apoderados Asociados a sus Alumnos";
        this.fsinalumnos = true;
      }else{
        this.falumno = true;
      }
    })
    
  }

  agregarAlumno(){
    this.__alumnos = new Array();
    for(let m of this.alumnos)
    {
      if(m['studentID']==this._alumnos){
        this.alumn.push(m);
        this.cantidadAlumnos--;
      }else{
        this.__alumnos.push(m);
      }
    }
    this.alumnos = new Array();
    this.alumnos = this.__alumnos;
    this.__alumnos = null;
    if(this.cantidadAlumnos <=0 )
    {
      this.mensajeSinAlumnos = "Ya seleccionaste a todos los alumnos de este curso";
        this.fsinalumnos = true;
        this.falumno = false;
    }
  }

  quitarAlumno(value : string){
    this._alumn= new Array();
    for(let m of this.alumn)
    {
      if(m['studentID']!=value){
        this._alumn.push(m);
      }
      else{
        this.alumnos.push(m);
        this.cantidadAlumnos++;
        if(!this.falumno)
          this.falumno = true;
      }
    }
    this.alumn = new Array();
    this.alumn = this._alumn;
    this._alumn = null;
  }


  cerrarSinAlumnos(){
    this.fsinalumnos = false;
    this.mensajeSinAlumnos = "";
  }


  cerrar()
  {
    this.flag = false;
    this.flagError = false;
    this.mensaje = "";
  }


  ngOnInit() {
  }

}
