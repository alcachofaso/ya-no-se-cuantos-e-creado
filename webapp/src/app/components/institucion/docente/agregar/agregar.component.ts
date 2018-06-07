import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  public nombre : string;
  public apellido : string;
  public email : string;
  public pass : string;
  public contract : Date;
  public flag:boolean;
  public mensaje:string;
  public warning: boolean;

  constructor(private auth :AuthService) {
    this.flag= false;
    this.warning = false;
   }

  ngOnInit() {
  }
  agregar(){
    this.flag= false;
    this.warning = false;
    if(this.nombre!= null && this.apellido!= null, this.email!= null && this.pass!=null){
      this.auth.agregarDocente(this.nombre,this.apellido,this.email,this.pass,this.contract,'1').subscribe(result =>{
        if(result.respuesta == "200"){
          this.flag = true;
          this.nombre = "";
          this.apellido = "";
          this.email = "";
          this.pass = "";
          this.contract = null;
        }
        else{
          if(result.respuesta == "300"){
          this.mensaje = "El Correo "+this.email+" ya esta en uso";
          this.warning = true;
          this.pass = "";
          }
        }
          
      })
    }else{
      this.mensaje = "Ingrese Los Datos Requeridos";
      this.warning = true;
    }
  }

  esconder(){
    this.warning = false;
  }

  aleatorio(){
    var a = "qwertyuioplkjhgfdsazxcvbnm1234567890";
    this.pass="";
    for(var m = 1; m <=8 ; m++)
    {
      this.pass= this.pass+ a[Math.floor((Math.random() * 35) + 1)];
    }
  }
}
