import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  public nombre: string;
  public apellido : string;
  public institucion : string;

  constructor(private authService: AuthService, private route:Router) { }

  ngOnInit() {
    if(this.authService.getRoleType != '1'){
      this.route.navigate(["/login"]);
    }
    this.nombre = this. authService.getUserName;
    this.apellido = this.authService.getUserLastname;
    this.institucion=this.authService.getIntitutionName;
  }

  onClickLogOut(){
    this.authService.singOut();
  }

}
