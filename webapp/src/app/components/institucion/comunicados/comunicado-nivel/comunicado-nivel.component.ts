import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service";
 
@Component({
  selector: 'app-comunicado-nivel',
  templateUrl: './comunicado-nivel.component.html',
  styleUrls: ['./comunicado-nivel.component.css']
})
export class ComunicadoNivelComponent implements OnInit {
  public titulo : string;
  public contenido : string;
  public flag : boolean;
  public flagError : boolean;
  public mensaje : string;
  public cursos : string[];
  public curso : string;
  public flagSinCursos: boolean;

  constructor(public auth : AuthService) { 
    this.flag = false;
    this.flagError = false;
    this.flagSinCursos = false;
    this.cursos = new Array();
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
    if(this.titulo.trim().length > 0 && this.contenido.trim().length > 0 && this.curso != null)
    {
      this.auth.enviarMensajeNivel(this.titulo, this.contenido, this.curso).subscribe(result =>{
        this.flag = true;
        this.titulo = "";
        this.contenido = "";
      });
      
    }else{
      this.mensaje = "El mensaje deve contener un titulo, un contenido y un destinatario."
      this.flagError = true;
    }
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
