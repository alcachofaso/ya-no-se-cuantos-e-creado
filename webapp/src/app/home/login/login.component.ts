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

  constructor(
    public authService: AuthService,
    public route:Router
  ) { }

  ngOnInit() {
  }

  logIn(){
    this.log();
  }

  log(){
    this.authService.signInEmail(this.email,this.password).subscribe(result => {
      this.authService.setUserId(result.userId);
      this.authService.setUserEmail(result.userEmail);
      this.authService.setUserName(result.userName);
      this.authService.setUserLastname(result.userLast);
      this.authService.setRoleEnable(result.userEnable);
      this.authService.setRolId(result.rolId);
      this.authService.setRoleType(result.roleType);
      this.authService.setRoleEnable(result.roleEnable);
      this.authService.setIntitutionId(result.institucionId);
      this.authService.setInstitutionName(result.intitutionName);
      this.authService.setIntitutionAddress(result.institutionAddress);
      this.authService.setInstitutionEnable(result.intitutionEnable);
      this.authService.setInicioLicencia(result.inicioLicencia);
      this.authService.setDuracionLicencia(result.duracionLicence);
     },error => {
       console.log(<any>error);
     });
     switch(this.authService.getRoleType)
     {
        case '0':
          this.route.navigate(["/Institucion"]);
          break;
        case '1':
          this.route.navigate(["/docente"]);
          break;
     }
  }

}
