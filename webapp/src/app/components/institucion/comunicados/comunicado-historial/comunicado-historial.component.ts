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

  constructor(public auth : AuthService) { 
    this.mensajes = new Array();
    this.mensajesComunidad = new Array();
    if(this.auth.getRoleType == '0'){
      this.auth.listarMensajes().subscribe(result=>{
        for(var a of result)
      {
        this.mensajes.push(a);
      }
      }),error => {
        console.log(<any>error);
      };
      this.auth.listarMensajesComunidad().subscribe(result=>{
        for(var a of result)
      {
        this.mensajesComunidad.push(a);
      }
      }),error => {
        console.log(<any>error);
      }
    }
  }

  ngOnInit() {
  }

}
