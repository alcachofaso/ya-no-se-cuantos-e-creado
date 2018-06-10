import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-home-institucion',
  templateUrl: './home-institucion.component.html',
  styleUrls: ['./home-institucion.component.css']
})
export class HomeInstitucionComponent implements OnInit {

  public info;
  public insti : string;
  public dir : string;
  public cantD : string;
  public est : string;
  public apo : string;
  public psi : string;
  public psipe : string;
  public telefonos : string[];

  constructor(public authService: AuthService) {
    this.telefonos = new Array();
    this.authService.getTelefono().subscribe(result=>{
      if(result != null)
      {
        for(var a of result)
        {
          this.telefonos.push(a.phone);
        }
      }
    })
    this.insti = this.authService.getIntitutionName;
    this.dir = this.authService.getIntitutionAddress;

    this.info = null;
     this.authService.homeAdministrador().subscribe(result => {
        this.cantD = result.teachers;
        this.est = result.students;
        this.apo= result.apoderado;
        this.psi = result.psicos;
        this.psipe = result.psicopes;
      },error => {
        console.log(<any>error);
      })
   }

  ngOnInit() {
  }
}
