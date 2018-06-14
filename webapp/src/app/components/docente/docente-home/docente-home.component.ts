import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-docente-home',
  templateUrl: './docente-home.component.html',
  styleUrls: ['./docente-home.component.css']
})
export class DocenteHomeComponent implements OnInit {

  public listado : string[];

  public idCurso : string;
  public nombreCurso : string;
  public identCurso : string;

  public fasignado : boolean;

  constructor(private auth : AuthService) {
    this.listado = new Array();
    this.fasignado = false;
    this.auth.ObtenerAlumnosCursoACargo().subscribe(result=>{
      for(let m of result){
        if(m != undefined)
          if(!this.fasignado)
            this.fasignado = true;

        this.listado.push(m);
      }
    });
    if(!this.fasignado){
    this.auth.infoCursdoaCargo().subscribe(r=>{
        this.idCurso = r['id'];
        this.nombreCurso = r['name'];
        this.identCurso = r['identifier'];
    })
    }
   }

  ngOnInit() {
  }

}
