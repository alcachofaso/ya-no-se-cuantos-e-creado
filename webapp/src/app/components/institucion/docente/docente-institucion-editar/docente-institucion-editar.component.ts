import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service";
import { SendEmailService } from "../../../../service/send-email.service";
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
  public factualizados : boolean;
  public factualizarContrasena : boolean;
  public fpassIgual : boolean;

  constructor( private _router : ActivatedRoute, private router : Router, private auth : AuthService, private _mail : SendEmailService) { 
    this.pass = "";
    this.id = _router.snapshot.paramMap.get('docente');
    this.frole = false;
    this.ferror = false;
    this.ftitulos = false;
    this.factualizados = false;
    this.factualizarContrasena = false;
    this.fpassIgual = false;
    this.fok = false;
    this.ftituloError = false;
    this.ftitulosOk = false;
    this.cursos = new Array();
    this.idiomas = new Array();
    this.ramos = new Array();
    if(auth.getRolId != undefined)
    {
      this.auth.permisoEditarDocente(this.id).subscribe(result=>{
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
    }
    this.fidioma = false;
    auth.obtenerAsignaturas().subscribe(r=>{
      for(let t of r){
        let x = parseInt(t['id']);
        if(x <= 12){
          this.ramos.push(t);
        }else{
          this.idiomas.push(t);
        }
      }
    })
  }

  obtenerTitulos()
  {
    this._titulos = new Array();
    this.auth.obtenerCantidadTitulos(this.id).subscribe(r=>{
      if(r['cantidad'] == '0'){
        this.ftitulos = false;
      }else{
        this.ftitulos = true;
        this.auth.obtenerTitulos(this.id).subscribe(r=>{
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

  aleatorio(){
    var a = "qwertyuioplkjhgfdsazxcvbnm1234567890";
    this.pass="";
    for(var m = 1; m <=8 ; m++)
    {
      this.pass= this.pass+ a[Math.floor((Math.random() * 35) + 1)];
    }
  }


  Actualizar(){
    this.factualizados = false;
    if(this._nombre.length > 0, this._apellido.length > 0 )
    {
      this.auth.actualizarDatosTrabajador(this.id,this.userId,this._nombre,this._apellido,this.contrato).subscribe(r=>r)
      this.auth.ObtenerNombreyApellido(this.id).subscribe(r=>{
      this.nombre= r['nombre'];
      this.Apellido= r['apellido'];
      this.factualizados = true;
      });
    }
    if(this.pass.length > 5 && this.pass.length <= 12)
    {
      this.auth.actualizarDatosTrabajadorPass(this.userId,this.pass).subscribe(r=>{
        if(r['respuesta']=="200"){
          this._mail.createAccount(r['email'],this.pass,'1','1',null).subscribe();
          this.factualizarContrasena = true;
        }else{
          this.fpassIgual = true;
        }
      });
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
    if(this.ramo == "9")
    {
      if(this.ramo!= null && this.curso!= null && this.identificador!=null && this.idioma != null){
        this._agregar(this.idioma);
      }else
      {
        this.ferror=true;
      }
    }else{
      if(this.ramo!= null && this.curso!= null && this.identificador!=null){
        this._agregar(this.ramo);
      }else
      {
        this.mensaje = "Ingrese los datos requeridos";
        this.ferror=true;
      }
    }
  }
  _agregar(value : string)
  {
    this.auth.agregarAsignatura(value,this.curso,this.identificador,this.id).subscribe(r=>{
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
    this.factualizarContrasena = false;
    this.factualizados = false;
    this.ferror = false;
    this.fok = false;
    this.ftituloError = false;
    this.ftitulosOk = false
    this.fpassIgual = false;
  }

  eleccion(){
    if(this.ramo == "9"){
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
      this.auth.agregarTitulo(this.titulo,this.institucion,this.id).subscribe(r=>{
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
