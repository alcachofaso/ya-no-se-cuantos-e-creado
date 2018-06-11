import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service"; 

@Component({
  selector: 'app-comunicado-curso',
  templateUrl: './comunicado-curso.component.html',
  styleUrls: ['./comunicado-curso.component.css']
})
export class ComunicadoCursoComponent implements OnInit {

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

   constructor(public auth : AuthService) { 
    this.flag = false;
    this.flagError = false;
    this.flagSinCursos = false;
    this.fIdentificador = false;
    this.identificadores = new Array();
    this.cursos = new Array();
    this.auth.listarCursosExistentes().subscribe(result=>{
      for(let m of result){
        this.cursos.push(m.name);
      }
    });
    console.log(this.cursos.length);
    console.log(this.cursos);
    if(this.cursos.length < 0)
    {
      this.flagSinCursos = true;
    }
  }

  enviar(){
    if(this.titulo.trim().length > 0 && this.contenido.trim().length > 0 && this.curso != null && this.identificador != null)
    {
      this.auth.enviarMensajeCurso(this.titulo, this.contenido, this.curso, this.identificador,'1','0').subscribe(result =>{
        this.flag = true;
        this.titulo = "";
        this.contenido = "";
      });
      
    }else{
      this.mensaje = "El mensaje deve contener un titulo, un contenido y un destinatario."
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


  cerrar()
  {
    this.flag = false;
    this.flagError = false;
    this.mensaje = "";
  }


  ngOnInit() {
  }

}
