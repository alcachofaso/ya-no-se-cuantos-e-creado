import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-atrasos-inasistencia',
  templateUrl: './atrasos-inasistencia.component.html',
  styleUrls: ['./atrasos-inasistencia.component.css']
})
export class AtrasosInasistenciaComponent implements OnInit {

  public mensaje : string;

  public listado : string[];


  public fasignado : boolean;
  public fok : boolean;
  public ferror : boolean;

  constructor(private auth : AuthService) {
    this.listado = new Array();
    this.fasignado = false;
    this.fok = false;
    this.ferror = false;
    this.auth.ObtenerAlumnosCursoACargo().subscribe(result=>{
      for(let m of result){
        if(m != undefined)
          if(!this.fasignado)
            this.fasignado = true;

        this.listado.push(m);
      }
    })
   }

   atraso(value : string, nombre : string, apellido : string){
     this.esconder();
    this.auth.registrarAtraso(value).subscribe(r=>{
      if(r['respuesta'] == '200'){
        this.mensaje = "Ya se registro el atraso de " + nombre+ " "+ apellido;
        this.ferror = true;
      }else{
        this.mensaje = "Se registro atraso para "+ nombre+ " "+ apellido;
        this.fok = true;
      }
    })
   }
   inasistencia(value : string, nombre : string, apellido : string){
      this.esconder();
      this.auth.registrarInasistencia(value).subscribe(r=>{
        if(r['respuesta'] == '200'){
          this.mensaje = "Ya se registro el atraso de " + nombre+ " "+ apellido;
          this.ferror = true;
        }else{
          this.mensaje = "Se registro atraso para "+ nombre+ " "+ apellido;
          this.fok = true;
        }
      })
   }

   esconder(){
     this.fok= false;
     this.ferror = false;
   }
  ngOnInit() {
  }
}
