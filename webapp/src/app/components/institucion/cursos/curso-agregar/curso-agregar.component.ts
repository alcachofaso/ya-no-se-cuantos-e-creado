import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service";


@Component({
  selector: 'app-curso-agregar',
  templateUrl: './curso-agregar.component.html',
  styleUrls: ['./curso-agregar.component.css']
})
export class CursoAgregarComponent implements OnInit {
  public cursos : string[];
  public curso: string;
  public identificador : string[];
  public ident : string;
  public profeJefe : string [];
  public idProfe : string;
  public alumnos : string[];
  public alumnosA : string[];
  public alumno : string;
  public cantidadALumons: string;
  private restantes: number;
  public fRestantes : boolean;
  public mensaje : string;
  public apellido : string;
  public rut : string;

  constructor(public auth : AuthService) {
    this.inicio();
   }


   private inicio(){
    this.cursos=new Array();
    this.identificador= new Array();
    this.alumnos = new Array();
    this.alumnosA = new Array();
    this.cursos = ['1° Basico','2° Basico','3° Basico','3° Basico','4° Basico',
      '5° Basico','6° Basico','7° Basico','8° Basico'];
    this.identificador = ['A','B','C','D','E','F','G','H'];
    this.traerProfesores();
    this.auth.homeAdministrador().subscribe(result => {
      if(this.auth.getDuracionLicencia == '1'){
        var m = parseInt(result.students, 10);
        this.restantes = 50 - m;
      }
    },error => {
      console.log(<any>error);
    })
    this.fRestantes = false;
   }


   private traerProfesores(){

    this.profeJefe = new Array();
    if(this.auth.getRoleType == '0'){
      this.auth.listarDocentesSinCursosAsignados().subscribe(result=>{
        for(var a of result)
      {
        this.profeJefe.push(a);
      }
      })
    }
   }

   agregarAlumno(){
    if(this.restantes > 0){
      if(this.alumno.trim().length > 1)
      {
        if(this.apellido.trim().length > 1)
        {
          this.alumnos.push(JSON.parse('{ "nombre":"'+this.alumno+'", "apellido":"'+this.apellido+'", "rut":"'+this.rut+'"}'));
          this.alumno= "";
          this.apellido= "";
          this.rut = "";
          this.restantes--;
        }
        
      }
    }else{
      this.mensaje = "Con la cuenta de prueba solo puedes agregar un maximo de 50 alumnos"
      this.fRestantes = true;
    }
   }


   esconder(){
     this.fRestantes= false;
   }

   editarAlumno(value : string,value2 : string, value3 : string){
     this.alumno= value;
     this.apellido= value2;
     this.rut = value3
    for (var g of this.alumnos)
    {
      if(g['nombre']!= value && g['apellido']!= value2 && g['rut'] != value3){
        this.alumnosA.push(g);
      }
    }
    this.alumnos = this.alumnosA
    this.alumnosA = new Array();
   }


   eliminarAlumno(value : string,value2 : string, value3 : string){
    for (var g of this.alumnos)
    {
      if(g['nombre']!= value && g['apellido']!= value2 && g['rut'] != value3){
        this.alumnosA.push(g);
      }
    }
    this.alumnos = this.alumnosA
    this.alumnosA = new Array();
  }

  ngOnInit() {
  }

  agregar(){
    if(this.curso != null && this.ident != null && this.idProfe != null && this.alumnos.length > 0){
      this.auth.agregarCurso(this.curso, this.ident,this.idProfe).subscribe(result => {
        var id = result.id;
        if(id == "Error 200"){
          this.mensaje = "Este Curso ya Existe";
          this.fRestantes = true;
        }else{
          for (var g of this.alumnos)
          {
            this.auth.agregarAlumnoCurso(id,g['nombre'],g['apellido'],g['rut']).subscribe(result => {

            })
          }
        }
        this.inicio();
        this.alumnos= new Array();
      },error => {
        console.log(<any>error);
      })

    } 
  }


  limpiar(){
    this.alumnos= new Array();
  }
}
