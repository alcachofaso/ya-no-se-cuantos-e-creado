import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";

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


  constructor(private auth : AuthService) {
    this.telefono = new Array();
    this.telefono = this.auth.getTelefono;
    this.nombre = this.auth.getIntitutionName;
    this.direccion = this.auth.getIntitutionAddress;
    }

  ngOnInit() {
    
  }

  agregarTelefono()
  {
    var f = true;
    if(this.telef.length==9){
      if(this.telefono != null){
        for(var a of this.telefono)
        {
          if(a == this.telef)
          {
            f = false;
            break;
          }
        }
      }
      if(f){
        this.telefono.push(this.telef);
        this.auth.agregarTelefonos(this.telef);
      this.telef = "";
      }
    }
  }

  quitarTelefono(tel : string){
    console.log(tel);
    this.auth.quitarTelefonos(tel);
    console.log("tel");
    console.log(this.telefono);
    this.auth.nullTelefono();
    this.auth.getTelefonos().subscribe(result => {
      for(var a of result)
      {
        this.auth.setTelefono(a.phone);
      }
      this.telefono = new Array();
      this.telefono = this.auth.getTelefono;
    },error => {
     console.log(<any>error);});

  }
  actualizarDatos()
  {
    this.auth.updateAdministrador(this.nombre, this.direccion);
    for(var a of this.telefono)
    {
      this.auth.updateAdministradortelefono(a);
    }

  }
}
