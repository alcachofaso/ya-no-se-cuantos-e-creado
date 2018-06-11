import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-docente-institucion-editar',
  templateUrl: './docente-institucion-editar.component.html',
  styleUrls: ['./docente-institucion-editar.component.css']
})
export class DocenteInstitucionEditarComponent implements OnInit {

  private id : string;
  public ramos : string[];
  public ramo : string;
  public idiomas : string[];
  public idioma : string;
  public cursos : string[];
  public curso : string;
  public identidicadores : string[];
  public identificador : string;
  public cursosDados : string[];
  public _titulos : string[];
  public nombre:string;
  public Apellido:string;
  public cant : number;
  public contrato;// : string;
  public pass : string;
  public userId : string;
  public titulo : string;
  public institucion : string;
  public mensaje : string;
  public _nombre: string;
  public _apellido : string;

  public fidioma : boolean;
  public fcursosDados : boolean;
  public ferror : boolean;
  public fok : boolean;
  public ftitulos : boolean;
  public ftituloError : boolean;
  public ftitulosOk : boolean;
  public frole : boolean;

  constructor( private _router : ActivatedRoute, private router : Router, private auth : AuthService) { 
    this.pass = "";
    this.id = _router.snapshot.paramMap.get('docente');
    this.frole = false;
    this.ferror = false;
    this.ftitulos = false;
    this.fok = false;
    this.ftituloError = false;
    this.ftitulosOk = false;
    this.cursos = new Array();
    
    this.auth.permisoEditar(this.id).subscribe(result=>{
      if(result['resultado'] == "200"){ 
        this.router.navigate(["/Institucion/institucion/Docente/Listado"]);
      }else{
        this.auth.ObtenerNombreyApellido(this.id).subscribe(r=>{
          this.nombre= r['nombre'];
          this.Apellido= r['apellido'];
          this.cant = Number(r['asignaturas']);
          this.contrato = r['contrato'];
          this.userId = r['userID'];
          this.obtenerTitulos();
          this._nombre = this.nombre;
          this._apellido = this.Apellido;
          if(r['type']!='1')
          {
            this.frole = true;
          }
        });
        this.auth.listarCursosExistentes().subscribe(r =>{
          for(let m of r)
          {
            this.cursos.push(m['name']);
          }
        })
        this.listadoCursosDados();
      }
    });
    this.fidioma = false;
    this.ramos = ['Lenguaje y Comunicación','Lengua Indígena', 'Matemática', 'Ciencias Naturales', 'Historia, Geografía y Ciencias Sociales', 
    'Artes Visuales', 'Música', 'Educación Física y Salud', 'Idioma Extranjero', 'Tecnología'];
    this.idiomas = ['Ingles', 'Frances', 'Aleman', 'Chino Mandarín', 'Portugués', 'Italiano', 'Mapudungun', 'Quechua'];
  }

  obtenerTitulos()
  {
    this._titulos = new Array();
    this.auth.obtenerCantidadTitulos(this.userId).subscribe(r=>{
      if(r['cantidad'] == '0'){
        this.ftitulos = false;
      }else{
        this.ftitulos = true;
        this.auth.obtenerTitulos(this.userId).subscribe(r=>{
          for(let c of r){
            this._titulos.push(c);
          }
        })
      }
    })
  }

  eliminarTitulo(value : string){
    this.auth.eliminarTitulos(value).subscribe(r=>{
      this.obtenerTitulos();
    });
  }


  Actualizar(){
    if(this._nombre.length > 0, this._apellido.length > 0 )
    {
      this.auth.actualizarDatosTrabajador(this.id,this.userId,this._nombre,this._apellido,this.contrato).subscribe(r=>r)
    }
    if(this.pass.length > 5 && this.pass.length <= 12)
    {
      this.auth.actualizarDatosTrabajadorPass(this.userId,this.pass).subscribe(r=>r);
    }
  }

  listadoCursosDados(){
    this.auth.cursosDados(this.id).subscribe(f=>{
      if(f['resultado'] == undefined){
        this.fcursosDados = true;
        this.cursosDados = new Array();
        for(let v of f)
          {
            this.cursosDados.push(v);
          }
      }
      else{
        this.fcursosDados = false;
      }
    })
  }

  eliminarAsignatura(value : string){
    this.auth.eliminarAsignatura(value).subscribe(r=>{
    this.listadoCursosDados();
    });
    
  }


  obtenerIdentificador(){
    this.identidicadores = new Array();
    this.auth.obtenerIdentificadores(this.curso).subscribe(r=>{
      for(let v of r)
          {
            this.identidicadores.push(v['identifier']);
          }
    })
  }

  ngOnInit() {
  }

  agregar(){
    this.esconder();
    if(this.ramo == "Idioma Extranjero")
    {
      if(this.ramo!= null && this.curso!= null && this.identificador!=null && this.idioma != null){
        this._agregar();
      }else
      {
        this.ferror=true;
      }
    }else{
      if(this.ramo!= null && this.curso!= null && this.identificador!=null){
        this._agregar();
      }else
      {
        this.mensaje = "Ingrese los datos requeridos";
        this.ferror=true;
      }
    }
  }
  _agregar()
  {
    this.auth.agregarAsignatura(this.ramo,this.curso,this.identificador,this.id).subscribe(r=>{
      if(r['respuesta'] == '300'){
        this.fok = true;
      }else{
        this.mensaje = "Este docente ya imparte esta asignatura";
        this.ferror= true;
      }
    this.listadoCursosDados();
    });
  }

  esconder(){
    this.ferror = false;
    this.fok = false;
    this.ftituloError = false;
    this.ftitulosOk = false;
  }

  eleccion(){
    if(this.ramo == "Idioma Extranjero"){
      this.fidioma = true;
    }
    else{
      if(this.fidioma)
      {
        this.fidioma = false;
      }
    }
  }
  volver(){
    this.router.navigate(["/Institucion/institucion/Docente/Listado"]);
  }

  agregarTitulo(){
    this.esconder();
    if(this.titulo != null && this.institucion != null){
      this.auth.agregarTitulo(this.titulo,this.institucion,this.userId).subscribe(r=>{
        if(r['respuesta'] == '300'){
          this.ftitulosOk = true;
          this.obtenerTitulos();
          this.titulo = "";
          this.institucion = "";
        }else{
          this.mensaje = "Este docente ya tiene registrado este título";
          this.ftituloError= true;
        }
        
      })
    }
    else{
      this.mensaje = "Ingrese los datos requeridos";
      this.ftituloError= true;
    }
  }

}
