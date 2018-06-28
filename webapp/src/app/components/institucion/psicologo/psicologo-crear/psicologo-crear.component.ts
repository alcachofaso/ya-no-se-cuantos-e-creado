import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service";
import { SendEmailService } from "../../../../service/send-email.service";

@Component({
  selector: 'app-psicologo-crear',
  templateUrl: './psicologo-crear.component.html',
  styleUrls: ['./psicologo-crear.component.css']
})
export class PsicologoCrearComponent implements OnInit {

  public nombre : string;
  public apellido : string;
  public email : string;
  public pass : string;
  public contract : string;
  public flag:boolean;
  public mensaje:string;
  public warning: boolean;

  constructor(private auth :AuthService, private _email : SendEmailService) {
    this.flag= false;
    this.warning = false;
   }

  ngOnInit() {
  }
  agregar(){
    this.flag= false;
    this.warning = false;
    if(this.nombre!= null && this.apellido!= null, this.email!= null && this.pass!=null){
      this.auth.agregarDocente(this.nombre,this.apellido,this.email,this.pass,this.contract,'2').subscribe(result =>{
        if(result.respuesta == "200"){
          this._email.createAccount(this.email,this.pass,'2','0', null).subscribe(r=>r);
          this.flag = true;
          this.mensaje = "Cuenta creada exitosamente";
          this.limpiarCampos();
        }
        else{
          if(result.respuesta == "300"){
            this._email.createAccount(this.email,this.pass,'2','2', null).subscribe(r=>r);
            this.mensaje = "Cuenta creada exitosamente";
            this.warning = true;
            this.pass = "";
            this.limpiarCampos();
          }else{
            if(result.respuesta == "400"){
              this.mensaje = "El Correo "+this.email+" ya tiene asociada una cuenta del tipo Psicólogo";
              this.warning = true;
              this.pass = "";
          }
        }
      }   
      })
    }else{
      this.mensaje = "Ingrese Los Datos Requeridos";
      this.warning = true;
    }
  }

  limpiarCampos(){
    this.nombre = "";
    this.apellido = "";
    this.email = "";
    this.pass = "";
    this.contract = null;
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
