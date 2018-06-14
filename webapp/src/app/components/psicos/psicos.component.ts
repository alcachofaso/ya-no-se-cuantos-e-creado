import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-psicos',
  templateUrl: './psicos.component.html',
  styleUrls: ['./psicos.component.css']
})
export class PsicosComponent implements OnInit {

  public nombre : string;
  public apellido : string;
  public institucion : string;
  public tipo : string;
  private rolId : string;

  constructor(private authService: AuthService, private route:Router) {
    this.rolId = this.authService.getRoleType;
   }

  ngOnInit() {
    if(this.rolId == "2" || this.rolId == '3'){
      if(this.rolId == '2'){
        this.tipo = 'Psicólogo';
      }else{
        this.tipo = 'Psicopedagogo';
      }
      this.nombre = this. authService.getUserName;
      this.apellido = this.authService.getUserLastname;
      this.institucion=this.authService.getIntitutionName;
    }else{
      this.route.navigate(["/login"]);
    }
    
  }

  onClickLogOut(){
    this.authService.singOut();
  }

}
