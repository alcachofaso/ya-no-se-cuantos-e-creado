import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-docente-mensaje-curso',
  templateUrl: './docente-mensaje-curso.component.html',
  styleUrls: ['./docente-mensaje-curso.component.css']
})
export class DocenteMensajeCursoComponent implements OnInit {

  
  public alumnos : string[];
  public alumno : string[];
  public _alumnos : string[];
  public mensajes : string[];

  public id : string;
  public nombre : string;
  public identificador : string;

  constructor(private router : Router, private auth : AuthService) { 
    this.mensajes = new Array();
    auth.datosCursoaCargo().subscribe(r=>{
        this.id = r['id'];
        this.nombre = r['name'];
        this.identificador = r['identifier'];
    })
    auth.mensajesCursoaCargo().subscribe(r=>{
      for(let t of r){
        this.mensajes.push(t);
      }
    })
  }

  detalle(value : string){
    this.router.navigate(["/Institucion/docente/Mensajes/detalle/", value]);
  }

  ngOnInit() {
  }

}
