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
  public cursoNombre : string;
  public cursoIdent : string;
  public profeNombre : string;
  public profeApellido : string;
  public cantidaAsignatura : string;
  public cantidadAlumnos : string;

  constructor(private _router : ActivatedRoute, private router : Router, private auth : AuthService) { 
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
          
            })
        }
    });
  }




    
  volver(){
    this.router.navigate(["/Institucion/institucion/Cursos/Listado"]);
  }

  ngOnInit() {
  }

}
