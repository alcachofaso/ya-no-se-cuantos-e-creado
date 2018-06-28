import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:string;
  public password:string;
  public message : string;

  public institucion : string[];
  public role : string[];

  public ferror : boolean;
  public finstitucion : boolean;
  public frole : boolean;

  constructor(private authService: AuthService, private route:Router) {
    this.ferror = false;
    this.finstitucion = false;
    this.frole = false;
    
    this.role = new Array();
   }

  ngOnInit() {
  }

  login(){
    
    this.ferror = false;
    this.institucion = new Array();
    this.authService.signInEmail(this.email,this.password).subscribe(result => {
      this.authService.setUserId(result.userId);
      this.authService.setUserEmail(result.userEmail);
      this.authService.setUserName(result.userName);
      this.authService.setUserLastname(result.userLast);
      if(this.authService.getUserId != undefined){
        if(result.userEnable == "1"){
          this.authService.signInEmailInstitucion().subscribe(r=>{
            for(let m of r){
              this.institucion.push(m);
            }
            console.log(this.institucion.length);
            if(this.institucion.length == 1)
            {
              console.log("Dentro del if de una sola institucion");
              console.log("institucion id " + this.institucion[0]['id']);
              console.log("institucion nombre " + this.institucion[0]['name']);
              console.log("institucion apellido " + this.institucion[0]['address']);
              this.authService.setIntitutionId(this.institucion[0]['id']);
              this.authService.setInstitutionName(this.institucion[0]['name']);
              this.authService.setIntitutionAddress(this.institucion[0]['address']);
              this.roles();
            }else{
              console.log("else del if de una sola institucion");
                this.finstitucion = true;
                console.log(this.finstitucion);
            }
          })
        }else{
          console.log('ERROR DE DESAVILITADO');
          this.message = "Esta cuenta se encuentra deshabilitada, para mayor información contactate a support@upnoticer.com";
        this.ferror = true;
        }
      }else{
        console.log('ERROR DE CREDWENCIALES ERRONEAS');
        this.message = "Estas credenciales no coinciden con nuestros registros";
        this.ferror = true;
      }
     },error => {
       console.log(<any>error);
     });
     
  }

  selectInsti(id:string, name:string, address : string){
    this.finstitucion = false;
    this.authService.setIntitutionId(id);
    this.authService.setInstitutionName(name);
    this.authService.setIntitutionAddress(address);
    this.roles();
  }

  roles(){
    this.authService.signInEmailRole().subscribe(t=>{
      for(let m of t){
        this.role.push();
      }
      if(this.role.length == 1){
        this.authService.setRolId(this.role['id']);
        this.authService.setRoleType(this.role['type']);
        this.router();
      }else{
        this.frole = true;
      }
    })
  }




  router(){
    switch(this.authService.getRoleType)
    {
       case '0':
         this.route.navigate(["/Institucion"]);
         break;
       case '1':
         this.route.navigate(["/docente"]);
         break;
       case '2':
         this.route.navigate(["/psico"]);
         break;
       case '3':
         this.route.navigate(["/psico"]);
         break;
    }
  }

}
