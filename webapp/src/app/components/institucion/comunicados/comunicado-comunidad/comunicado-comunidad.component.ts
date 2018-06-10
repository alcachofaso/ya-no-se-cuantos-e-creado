import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service";

@Component({
  selector: 'app-comunicado-comunidad',
  templateUrl: './comunicado-comunidad.component.html',
  styleUrls: ['./comunicado-comunidad.component.css']
})
export class ComunicadoComunidadComponent implements OnInit {

  public titulo : string;
  public contenido : string;
  public flag : boolean;
  public flagError : boolean;
  public mensaje : string;

  constructor(public auth : AuthService) { 
    this.flag = false;
    this.flagError = false;
  }

  enviar(){
    if(this.titulo.trim().length > 0 && this.contenido.trim().length > 0)
    {
      this.auth.enviarMensajeComunidad(this.titulo, this.contenido).subscribe(result =>{
        this.flag = true;
        this.titulo = "";
        this.contenido = "";
      });
      
    }else{
      this.mensaje = "El mensaje deve contener un titulo y un contenido."
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
