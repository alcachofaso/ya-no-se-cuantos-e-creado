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
  public fok : boolean;
  public frut : boolean;
  public mensaje : string;
  public apellido : string;
  public rut : string;

  constructor(public auth : AuthService) {
    this.inicio();
   }


   private inicio(){
     this.frut = false;
     this.fok = false;
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
     this.esconder();
    if(this.alumno != undefined && this.apellido != undefined && this.rut != undefined){
      this.fRestantes = false;
      if(this.restantes > 0){
        if(this.alumno.trim().length > 1)
        {
          if(this.apellido.trim().length > 1)
          {
            if(this.rut.trim().length == 10)
            {
              if(this.rut[8] == "-"){
                var m = this.rut[0]+this.rut[1]+this.rut[2]+this.rut[3]+this.rut[4]+this.rut[5]+this.rut[6]+this.rut[7];
                var cuerpo;
                if(cuerpo = parseInt(m)){
                  if(this.rut[9] == '0' || this.rut[9] == '1' || this.rut[9] == '2' || this.rut[9] == '3' || this.rut[9] == '4' || 
                  this.rut[9] == '5' || this.rut[9] == '6' || this.rut[9] == '7' || this.rut[9] == '8' || this.rut[9] == '9' || 
                  this.rut[9] == 'k'){


                    if(this.alumnos.length != 0){
                      var ok = true;
                      for (var g of this.alumnos)
                      {
                        if(g['rut'] == this.rut)
                        {
                          if(ok)
                          {
                            ok = false;
                          }
                        }
                        
                      }
                      if(ok){
                        this.alumnos.push(JSON.parse('{ "nombre":"'+this.alumno+'", "apellido":"'+this.apellido+'", "rut":"'+this.rut+'"}'));
                        this.alumno= "";
                        this.apellido= "";
                        this.rut = "";
                        this.restantes--;
                      }else{
                        this.mensaje = "Ya ingreso a este Alumno";
                        this.fRestantes = true;
                      }
                    }else{
                      this.alumnos.push(JSON.parse('{ "nombre":"'+this.alumno+'", "apellido":"'+this.apellido+'", "rut":"'+this.rut+'"}'));
                      this.alumno= "";
                      this.apellido= "";
                      this.rut = "";
                      this.restantes--;
                    }
                    


                  }else{
                    this.mensaje = "Rut Invalido";
                    this.fRestantes = true;
                  }
                }else{
                  this.mensaje = "El cuerpo del rut solo puede contener numeros";
                  this.fRestantes = true;
                }
              }else{
                this.mensaje = "El rut tiene que tener un formato valido ej 12345678-9";
                this.fRestantes = true;
              }
            }else{
              this.mensaje = "El rut tiene que tener un formato valido ej 12345678-9";
              this.fRestantes = true;
            }
          }
          
        }
      }else{
        this.mensaje = "Con la cuenta de prueba solo puedes agregar un maximo de 50 alumnos"
        this.fRestantes = true;
      }
    }else{
      this.mensaje = "Ingrese los datos del alumno";
        this.fRestantes = true;
    }
   }


   esconder(){
     this.fRestantes= false;
     this.fok = false;
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
    this.frut = false;
    if(this.curso != null && this.ident != null && this.idProfe != null && this.alumnos.length > 0){
      this.auth.agregarCurso(this.curso, this.ident,this.idProfe).subscribe(result => {
        if(result['id'] == "Error 200"){
          this.mensaje = "Este Curso ya Existe";
          this.fRestantes = true;
        }else{
          for (var g of this.alumnos)
          {
            var r = g['rut'][0]+g['rut'][1]+g['rut'][2]+g['rut'][3]+g['rut'][4]+g['rut'][5]+g['rut'][6]+g['rut'][7];
            this.auth.agregarAlumnoCurso(result['id'] ,g['nombre'],g['apellido'],r).subscribe(result => {
              if(result['resultado'] != '0'){
                if(!this.frut){
                  this.frut = true;
                }
              }
            })
          }
          if(this.frut){
            this.mensaje = result['resultado'] + "Alumnos no pudieron ser registrados";
            this.fRestantes = true;
          }
          this.inicio();
          this.fok = true;
          this.alumnos= new Array();
        }
        
      },error => {
        console.log(<any>error);
      })

    } else{
      this.mensaje = "Ingrese todos los datos solicitados";
      this.fRestantes = true;
    }
  }


  limpiar(){
    this.alumnos= new Array();
  }
}
