import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-recividos',
  templateUrl: './recividos.component.html',
  styleUrls: ['./recividos.component.css']
})
export class RecividosComponent implements OnInit {

  public mensajes : string[];
  

  public frecibido : boolean ;


  constructor(private auth : AuthService,public route:Router) {
    this.mensajes = new Array();
    this.frecibido = false;

    auth.ObtenerMensajesRecividos().subscribe(r=>{
      for(let m of r){
        this.mensajes.push(m);
      }
      if(this.mensajes.length!=0){
        this.frecibido = true;
      }
    })
   }

  contenido(value :string){
    this.route.navigate(["/psico/mensajes/detalle/", value]);
  }

  ngOnInit() {
  }

}
