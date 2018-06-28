import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service";

@Component({
  selector: 'app-comunicado-historial',
  templateUrl: './comunicado-historial.component.html',
  styleUrls: ['./comunicado-historial.component.css']
})
export class ComunicadoHistorialComponent implements OnInit {
  public mensajes : string[];
  public mensajesComunidad : string[];

  public fmensajes : boolean;
  public fmensajesComunidad : boolean;

  constructor(public auth : AuthService) { 
    this.mensajes = new Array();
    this.mensajesComunidad = new Array();
    this.fmensajes = false;
    this.fmensajesComunidad = false;
    if(this.auth.getRoleType == '0'){
      this.auth.listarMensajes().subscribe(result=>{
        for(var a of result)
      {
        if(a['titulo'] != null){
          this.mensajes.push(a);
        }
      }
      if(this.mensajes.length != 0){
        this.fmensajes = true;
      }
      }),error => {
        console.log(<any>error);
      };
      this.auth.listarMensajesComunidad().subscribe(result=>{
        for(var a of result)
      {
        this.mensajesComunidad.push(a);
      }
      if(this.mensajesComunidad.length != 0){
        this.fmensajesComunidad = true;
      }
      }),error => {
        console.log(<any>error);
      }
    }
  }

  ngOnInit() {
  }

}
