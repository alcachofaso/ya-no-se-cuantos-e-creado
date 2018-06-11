import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-curso-editar',
  templateUrl: './curso-editar.component.html',
  styleUrls: ['./curso-editar.component.css']
})
export class CursoEditarComponent implements OnInit {
  public id : string;
  public idAlumno : string;
  public cursoNombre : string;
  public cursoIdent : string;
  public profeNombre : string;
  public profeApellido : string;
  public cantidaAsignatura : string;
  public cantidadAlumnos : string;
  
  public nombreAlumno : string;
  public apellidoAlumnos : string
  public rut : string;
  public rutVerificador : string;
  public mensaje : string;
  public operacion : string;

  public alumnos : string[];
  public asignaturas : string[];


  public fingresoAlumno : boolean;
  public ferrorAlumno : boolean;

  constructor(private _router : ActivatedRoute, private router : Router, private auth : AuthService) { 
    this.fingresoAlumno = false;
    this.ferrorAlumno = false;
    this.operacion = "0";
    this.id = _router.snapshot.paramMap.get('curso');
    this.auth.permisoEditar(this.id).subscribe(result=>{
      if(result['resultado'] == "200"){ 
        this.router.navigate(["/Institucion/institucion/Cursos/Listado"]);
      }else{
        auth.obtenerInformacionCurso(this.id).subscribe(r=>{
          this.cursoIdent = r['cursoIdent'];
          this.cursoNombre = r['cursoNombre'];
          this.profeNombre = r['profeNombre'];
          this.profeApellido = r['profeApellido'];
          this.cantidaAsignatura = r['cantidadAsig'];
          this.cantidadAlumnos = r['cantidad'];
          this.listaAlumnos();
            })
        }
    });
    this.asignaturas = new Array();
    auth.obtenerAsignaturasCurso(this.id).subscribe(r=>{
      for(let a of r){
        this.asignaturas.push(a);
      }
    })
  }


  listaAlumnos(){
    this.alumnos = new Array();
    this.auth.obtenerListadoAlumnosCurso(this.id).subscribe(r=>{
      for(let a of r){
        this.alumnos.push(a);
      }
    })
  }


  agregarAlumno(){
    if(this.nombreAlumno != undefined && this.apellidoAlumnos != undefined && this.rut != undefined && this.rutVerificador != undefined){
      if(this.operacion == '0'){

      this.auth.agregarAlumnoCurso(this.id,this.nombreAlumno,this.apellidoAlumnos, this.rut).subscribe(r=>{
        if(r['resultado'] == '0'){
          this.fingresoAlumno = true;
        }else{
          this.mensaje = "El alumno ya se encuentra registrado";
          this.ferrorAlumno= true;
        }
      })
    }else{
      this.auth.actualizarDatosAlumno(this.nombreAlumno,this.apellidoAlumnos,this.idAlumno).subscribe(r=>r);
    }
    }else{
      this.mensaje = "Ingrese los datos requeridos";
          this.ferrorAlumno= true;
    }
    this.operacion = '0';
    this.listaAlumnos();
  }

  editarAlumno(id : string, nombre : string, apellido : string, rut : string){
    this.nombreAlumno = nombre;
    this.apellidoAlumnos = apellido;
    this.rut = rut;
    this.idAlumno = id;
    this.operacion = '1';
  }

  eliminarAlumno(value : string){
    this.auth.eliminarAlumno(value).subscribe(r=>{
    this.listaAlumnos();
    this.mensaje = "Alumno ELiminado Correctamente";
    this.ferrorAlumno= true;
    });
  }


    
  volver(){
    this.router.navigate(["/Institucion/institucion/Cursos/Listado"]);
  }
  esconder(){
    this.ferrorAlumno = false;
    this.fingresoAlumno = false;
  }

  ngOnInit() {
  }

}
