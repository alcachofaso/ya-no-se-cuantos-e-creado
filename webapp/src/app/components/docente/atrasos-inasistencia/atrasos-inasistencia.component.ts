import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-atrasos-inasistencia',
  templateUrl: './atrasos-inasistencia.component.html',
  styleUrls: ['./atrasos-inasistencia.component.css']
})
export class AtrasosInasistenciaComponent implements OnInit {

  public listado : string[];
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
    })
   }
  ngOnInit() {
  }

}
