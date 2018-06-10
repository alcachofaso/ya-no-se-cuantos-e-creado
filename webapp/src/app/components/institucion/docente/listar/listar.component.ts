import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

public listadoDocentes:string[]; 
public listadoPsico : string[];
public listaPsicopeda : string[];
public fDocente : boolean;
public fPsico : boolean;
public fpsicopeda : boolean;
public fexistentes : boolean;
public fResultado : boolean;
public fResultadoPsico : boolean;
public fResultadoPsipeda : boolean;
public mensage : String;


  constructor(private auth : AuthService, private route:Router) { 
    if(this.auth.getRoleType != '0'){
      this.route.navigate(["/login"]);
    }
    
    
    
    this.fDocente = false;
    this.fpsicopeda = false;
    this.fResultadoPsico = false;
    this.fResultadoPsipeda = false;
    this.fPsico = false;
    this.fexistentes = false;
    this.fResultado = false;
    this.listarDocente();
    this.listarPsico();
     this.listarPsipeda();
  }

listarDocente(){
  this.listadoDocentes= new Array();
  this.auth.listarDocentes('1').subscribe(result =>{
    for(var a of result)
    {
      if(a['userId'] != undefined){
       if(!this.fexistentes)
         this.fexistentes = true;
       this.fDocente = true;
      }
     this.listadoDocentes.push(a);
    }
   })
}
listarPsico(){
  this.listadoPsico = new Array();
  this.auth.listarDocentes('2').subscribe(result =>{
    for(var a of result)
    {
      if(a['userId'] != undefined){
        if(!this.fexistentes)
          this.fexistentes = true;
       this.fPsico = true;
      }
     this.listadoPsico.push(a);
    }
   })
}
listarPsipeda(){
  this.listaPsicopeda = new Array();
  this.auth.listarDocentes('3').subscribe(result =>{
    for(var a of result)
    {
      if(a['userId'] != undefined){
        if(!this.fexistentes)
          this.fexistentes = true;
        this.fpsicopeda = true;
      }
     this.listaPsicopeda.push(a);
    }
   })
}


  eliminarTrabajador(id : string, nombre : string, apellido : string, type : number){
    this.fResultado = false;
    this.fResultadoPsico = false;
    this.fResultadoPsipeda = false;
    console.log(type);
    if(type == 0)
    {
      this.auth.eliminarDocente(id).subscribe(r=>{
        this.mensage = "Docente "+ nombre + " " + apellido +" fue Eliminado";
        this.fResultado = true;
        this.listarDocente();
      });
    }else{
      this.auth.eliminarPsicos(id).subscribe(r=>{
        if(type== 1){
          this.mensage = "Psicologo "+ nombre + " " + apellido +" fue Eliminado";
          this.fResultadoPsico = true;
          this.listarPsico();
        }else{
          this.mensage = "Psicopedagogo "+ nombre + " " + apellido +" fue Eliminado";
          this.fResultadoPsipeda = true;
          this.listarPsipeda();
        }
      });
    }
   
  }

  esconder(){
    this.fResultado = false;
    this.mensage = "";
  }

  editarDocente(value :string){
    this.route.navigate(["/Institucion/institucion/Docente/editar/", value]);
  }

  editarTrabajador(value :string){
    this.route.navigate(["/Institucion/institucion/Docente/editar/psico/", value]);
  }

  ngOnInit() {
  }

}
