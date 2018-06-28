import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { SendEmailService } from "../../service/send-email.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public Email : string;
  public pass : string; 
  public passR : string;
  public institucion : string;
  public direccion : string;
  public comunas : string[];
  public name : string;
  public lastname : string;
  public comuna : string;

  public fEmail : boolean; //si el email es valido
  public fEmailExistente : boolean; // si el email ya esta registrado
  public fEmaillength : boolean; // si el email se ingrese
  public fPass : boolean; //si se ingreso contraseña
  public fPasslength : boolean; // si la contraseña es menos a 6 caracteres
  public fPassCaracteres : boolean; //si la contraseña contiene numeros y letras mayusculas y minusculas
  public fPassCaracteresEspeciales : boolean; //si la contraseña tiene caracteres no admitidos

  public fPassR : boolean;
  public fInstitucion : boolean;
  public fDireccion : boolean;
  public fname : boolean;
  public flastname : boolean;

  public mayusculas : string;
  public minusculas : string;
  public numeros : string;

  public registroCorrecto : boolean;



  constructor( private authService: AuthService, private email : SendEmailService) { 
  this.mayusculas = "QWERTYUIOPÑLKJHGFDSAZXCVBNM";//
  this.minusculas = "qazxswedcvfrtgbnhyujmkiopñl";// CONJUNTO DE CARACTERES PERMITIDOS
  this.numeros = "9513782640";                    //
  this.resetFlags();
  this.Email = "";
  this.pass = "";
  this.name = "";
  this.lastname = "";
  this.passR = "";
  this.institucion = "";
  this.direccion ="";
  this.comunas = new Array();
  authService.obtenerComunas().subscribe(r=>{
    for(let t of r){
      this.comunas.push(t);
    }
  })


  }
  resetFlags(){
    this.fEmail = false;
    this.fEmailExistente = false;
    this.fEmaillength = false;
    this.fPass = false;
    this.fPasslength = false;
    this.fPassCaracteres = false;
    this.fPassCaracteresEspeciales = false;
    this.fPassR = false;
    this.fInstitucion = false;
    this.fDireccion = false;
    this.registroCorrecto = false;
    this.fname = false;
    this.flastname = false;
  }

  ngOnInit() {
  }

  onSubmitAddUser(){
 
    this.resetFlags();
    if(this.direccion.length < 1)
    {
      this.fDireccion = true;
    }
    if(this.institucion.length < 1)
    {
      this.fInstitucion = true;
    }
    if(this.Email.length < 1)
    {
      this.fEmaillength = true;
    }
    if(this.name.length < 1)
      this.fname = true;
    if(this.lastname.length < 1)
      this.flastname = true;

    if(this.pass.length < 6) // si no cumple con el largo necesario
    {
      this.fPasslength = true;
    }else{
      if( this.pass != this.passR ) // si las constraseñas no coinciden
      {
        this.fPassR = true;
      }
      else{
        var minuscula = false;
        var mayuscula = false;
        var numero = false;
        for(var cont=0; cont<this.pass.length; cont++)//comprobar si tiene numeros, letras mayusculas y minusculas y no caracteres no admitidos
        {
          var min = false;
          var may = false;
          var num = false;
            for(var cont2=0; cont2 <this.minusculas.length; cont2++)
            {
              if(this.pass[cont] == this.minusculas[cont2])
              {
                min= true;
                break;
              }
            }
          if(!min)
          {
            for(var cont2=0; cont2 <this.mayusculas.length; cont2++)
            {
              if(this.pass[cont] == this.mayusculas[cont2])
              {
                may= true;
                break;
              }
            }
          }
          if(!min && !may)
          {
            for(var cont2=0; cont2 <this.numeros.length; cont2++)
            {
              if(this.pass[cont] == this.numeros[cont2])
              {                  
                num= true;
                break;
              }
            }
          }
          if(!min && !may && !num)
          {
            this.fPassCaracteresEspeciales= true;
            break;
          }
          if(!mayuscula)
          {
            if(may)
            {
              mayuscula= true;
            }
          }
          if(!minuscula)
          {
            if(min)
            {
              minuscula= true;
            }
          }
          if(!numero)
          {
            if(num)
            {
              numero= true;
            }
          }
        }
        if(!minuscula && !mayuscula && !numero)
        {
          this.fPassCaracteres= true; 
        }
      }
    }
    if(!this.fPasslength && !this.fPassCaracteres && !this.fPassCaracteresEspeciales && !this.fPassR && 
      !this.fInstitucion && !this.fDireccion && !this.fEmail)
    {
      this.authService.ingresarRegistro(this.name,this.lastname,this.Email,this.institucion, 
        this.direccion, this.pass, this.comuna).subscribe(result => {
          if(result.respuesta == "200" )
            {this.fEmailExistente = true;}
          else
            {this.registroCorrecto = true;
              this.email.createAccount(this.Email,this.pass,'0','0',this.institucion).subscribe(r=>r);
              this.Email = undefined;
              this.pass = undefined;
              this.name = undefined;
              this.lastname = undefined;
              this.passR = undefined;
              this.institucion = undefined;
              this.direccion = undefined;
            }
            
      },error => {
        console.log(<any>error);
      })

    }
  }
}