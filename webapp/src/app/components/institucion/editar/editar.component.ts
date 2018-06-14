import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  public nombre : string;
  public direccion : string;
  public telef : string;
  public telefono : string[];


  constructor(private auth : AuthService, private route:Router) {
    
    this.nombre = this.auth.getIntitutionName;
    this.direccion = this.auth.getIntitutionAddress;
    this._getTelefonos();
    }


  _getTelefonos(){
    this.telefono = new Array();
    this.auth.getTelefono().subscribe(result=>{
      if(result != null)
      {
        for(var a of result)
        {
          this.telefono.push(a.phone);
        }
      }
    })
  }

  ngOnInit() {
    
  }

  agregarTelefono()
  {
    var f = true;
    if(this.telef!=undefined){
      if(this.telef.length == 9  && parseInt(this.telef))
        {for(var a of this.telefono)
        {
          if(a == this.telef)
          {
            f = false;
            break;
          }
        }
      if(f){
        this.auth.agregarTelefonos(this.telef).subscribe(r=>{
          this._getTelefonos();
        });
      this.telef = "";
      }}
    }
  }

  quitarTelefono(tel : string){
    this.auth.quitarTelefonos(tel).subscribe(r=>{
      this._getTelefonos();
    });
  }

  actualizarDatos()
  {
    this.auth.updateAdministrador(this.nombre, this.direccion).subscribe(r=>{
      this.route.navigate(["/Institucion"]);
    });
  }
}
