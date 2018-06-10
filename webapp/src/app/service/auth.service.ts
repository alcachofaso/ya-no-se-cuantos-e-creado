import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";



@Injectable()
export class AuthService {

  private email:string;
  private uid : string;
  private url : string;
  private userId  : string;
  private userEmail : string; 
  private userName : string;
  private userLast : string;
  private userEnable : string;
  private rolId : string;
  private roleType : string;
  private roleEnable : string;
  private institucionId : string;
  private intitutionName : string;
  private institutionAddress : string;
  private intitutionEnable : string;
  private inicioLicencia : Date;
  private duracionLicence : string;

  constructor(    public router : Router, public _http : HttpClient) {}

  public get getUserId(){
    return this.userId;
  }
  setUserId(id: string){  
    this.userId = id;  
  }
  public get getUserEmail(){
    return this.userEmail;
  }
  setUserEmail(email: string){  
    this.userEmail = email;  
  }
  public get getUserName(){
    return this.userName;
  }
  setUserName(name: string){  
    this.userName = name;  
  }
  public get getUserLastname(){
    return this.userLast;
  }
  setUserLastname(lastname : string){
    this.userLast = lastname;
  }
  public get  getUserEnable(){
    return this.userEnable;
  }
  setUserEnable(enable : string){
    this.userEnable = enable;
  }
  public get getRolId(){
    return this.rolId;
  }
  setRolId(rol : string){
    this.rolId = rol;
  }
  public get  getRoleType(){
    return this.roleType;
  }
  setRoleType(type : string){
    this.roleType = type;
  }
  public get getRoleEnable(){
    return this.roleEnable;
  }
  setRoleEnable( enable : string ){
    this.roleEnable = enable;
  }
  public get getInstitutionId(){
    return this.institucionId;
  }
  setIntitutionId( id : string ){
    this.institucionId = id;
  }
  public get getIntitutionName(){
    return this.intitutionName;
  }
  setInstitutionName(nombre : string){
    this.intitutionName = nombre;
  }
  public get getIntitutionAddress(){
    return this.institutionAddress;
  }
  setIntitutionAddress(adres : string){
    this.institutionAddress = adres;
  }
  public get getIntitutionEnable(){
    return this.intitutionEnable;
  }
  setInstitutionEnable(value : string){
    this.intitutionEnable = value;
  }
  public get getInicioLicencia(){
    return this.inicioLicencia;
  }
  setInicioLicencia(value: Date){
    this.inicioLicencia = value;
  }
  public get getDuracionLicencia(){
    return this.duracionLicence;
  }
  setDuracionLicencia(value : string){
    this.duracionLicence = value;
  }
  getTelefono(): Observable<any>{
    return this._http.get('http://localhost/upnoticer/prueba/administrador.php?op=44&institucion='+this.institucionId);
  }


  signInEmail(email: string, password:string): Observable<any>{
    return this._http.get('http://localhost/upnoticer/prueba/insertarUser.php?op=2&email='+
    email+"&pass="+password);
  }

  agregarTelefonos(telefono:string): Observable<any>{
   console.log('http://localhost/upnoticer/prueba/administrador.php?op=4&institucion='+this.institucionId+"&telefono="+telefono);
    return this._http.get('http://localhost/upnoticer/prueba/administrador.php?op=4&institucion='+this.institucionId+"&telefono="+telefono);
  }

  quitarTelefonos(telefono:string): Observable<any>{
   console.log('http://localhost/upnoticer/prueba/administrador.php?op=6&institucion='+this.institucionId+"&telefono="+telefono);
    return this._http.get('http://localhost/upnoticer/prueba/administrador.php?op=6&institucion='+this.institucionId+"&telefono="+telefono);
  }

  singOut(){
    this.roleType = null;
    this.router.navigate(["/"]);
  }

  ingresarRegistro(name: string, lastname: string, email : string, institucion : string, direccion : string, pass : string): Observable<any>{
       return this._http.get("http://localhost:80/upnoticer/prueba/insertarUser.php?op=0&name="+name+
    "&lastname="+lastname+"&email="+email+"&institucion="+institucion+"&direccion="+direccion+"&pass="+pass)
        
  }

  homeAdministrador(): Observable<any> {
    return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=0&institution='+this.institucionId);
  }

  editarAdministrador(): Observable<any> {
    return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=1&institution='+this.institucionId);
  }



  updateAdministrador(nombre : string, direccion : string): Observable<any> {
    if(nombre != this.intitutionName || direccion != this.institutionAddress)
    {
      this.setInstitutionName(nombre);
      this.setIntitutionAddress(direccion);
      //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=3&institution='+this.institucionId+"&nombre="+nombre+"&direccion="+direccion);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=3&institution='+this.institucionId+"&nombre="+nombre+"&direccion="+direccion);
    
    }
  }

  updateAdministradortelefono(telefono : string): Observable<any> {
    return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=4&institution='+this.institucionId+"&telefono="+telefono);
  }

  listarDocentes(type : string): Observable<any> {
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=5&institucion='+this.institucionId+"&type="+type);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=5&institucion='+this.institucionId+"&type="+type);
    }
  listarDocentesSinCursosAsignados(): Observable<any> { //Que no esta asignado a ningun curso
      //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=7&institucion='+this.institucionId);
        return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=7&institucion='+this.institucionId);
      }

  agregarDocente(nombre : string, apellido : string, email : string, pass : string, contrato: string, type : string): Observable<any> {
    return this._http.get('http://localhost:80/upnoticer/prueba/insertarUser.php?op=3&insitution='+this.institucionId+
      "&nombre="+nombre+"&apellido="+apellido+"&dEmail="+email+"&pass="+pass+"&contrato="+contrato+"&type="+type);
    
  }

  agregarCurso(nivel : string, identificador : string, profesor : string): Observable<any> {
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=8&insitution='+this.institucionId+"&nivel="+nivel+"&identificador="+identificador+"&profesor="+profesor);
  return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=8&insitution='+this.institucionId+
    "&nivel="+nivel+"&identificador="+identificador+"&profesor="+profesor);
  }
  agregarAlumnoCurso(curso : string, nombre : string, apelido : string, rut : string): Observable<any> {
  //  console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=88&curso='+curso+
  //  "&nombre="+nombre+"&apellido="+apelido);
    return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=88&curso='+curso+
      "&nombre="+nombre+"&apellido="+apelido+"&rut="+rut);
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Listar Todos Los Cursos////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  listarCursos(): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=9&institucion='+this.institucionId);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=9&institucion='+this.institucionId);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////Listado Todos Los alumnos de un Curso//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  listarEstudiantes(value : string): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=10&institucion='+value);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=10&curso='+value);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////Eliminar Todos Los alumnos de un Curso/////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  eliminarEstudiantes(value : string): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=11&id='+value);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=11&id='+value);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////Eliminar  un Curso//////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  eliminarCurso(value : string): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=12&id='+value);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=12&id='+value);
    }
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////Listar Mensajes//////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  listarMensajes(): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=13&id='+this.rolId);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=13&id='+this.rolId);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////Listar Mensajes Comunidad/////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  listarMensajesComunidad(): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=14&id='+this.rolId+"&institucion="+this.institucionId);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=14&id='+this.rolId+"&institucion="+this.institucionId);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////Envir mensajes comunidad////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  enviarMensajeComunidad(titulo : string, contenido : string): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=15&institucion='+this.institucionId+"&sender="+this.rolId
   // +"&titulo="+titulo+"&contenido="+contenido);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=15&institucion='+this.institucionId+"&sender="+this.rolId
    +"&titulo="+titulo+"&contenido="+contenido);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Listar c ursos existentes//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  listarCursosExistentes(): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=16&institucion='+this.institucionId);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=16&institucion='+this.institucionId);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Envir mensajes NIVEL////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  enviarMensajeNivel(titulo : string, contenido : string, curso : string): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=17&institucion='+this.institucionId+"&sender="+this.rolId
    //+"&titulo="+titulo+"&contenido="+contenido+"&curso="+curso);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=17&institucion='+this.institucionId+"&sender="+this.rolId
    +"&titulo="+titulo+"&contenido="+contenido+"&curso="+curso);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////Obtener Identificadores///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  obtenerIdentificadores(curso : string): Observable<any> { 
   // console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=18&institucion='+this.institucionId+"&curso="+curso);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=18&institucion='+this.institucionId+"&curso="+curso);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Envir mensajes CURSO////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  enviarMensajeCurso(titulo : string, contenido : string, curso : string, identidicador : string): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=19&institucion='+this.institucionId+"&sender="+this.rolId
    //+"&titulo="+titulo+"&contenido="+contenido+"&curso="+curso);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=19&institucion='+this.institucionId+"&sender="+this.rolId
    +"&titulo="+titulo+"&contenido="+contenido+"&curso="+curso+"&identificador="+ identidicador);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////Obtener Identificadores///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  obtenerAlumnos(curso : string, identificador : string): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=20&institucion='+this.institucionId+"&curso="+curso
    //+"&identificador="+identificador);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=20&institucion='+this.institucionId+"&curso="
      +curso+"&identificador="+identificador);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Envir mensajes ESPECIFICO//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  enviarMensajeEspecifico(titulo : string, contenido : string): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=21&institucion='+this.institucionId+"&sender="+this.rolId
    //+"&titulo="+titulo+"&contenido="+contenido);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=21&institucion='+this.institucionId+"&sender="+this.rolId
    +"&titulo="+titulo+"&contenido="+contenido);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Envir mensajes ESPECIFICO Alumnos//////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  enviarMensajeEspecificoAlumnos(studentID : string, mensajeID : string, roleId : string): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=22&studentID='+studentID+"&mensajeID="+mensajeID);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=22&studentID='+studentID+"&mensajeID="+mensajeID+"&roleId="+roleId);
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Envir mensajes ESPECIFICO Alumnos id///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  enviarMensajeEspecificoAlumnosGetId(studentID : string): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=22&studentID='+studentID);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=222&studentID='+studentID);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////Eliminar psico o psicopega///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  eliminarDocente(docenteId : string): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=233&institucion='+this.institucionId+"&docenteId="+docenteId);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=233&institucion='+this.institucionId+"&docenteId="+docenteId);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////Eliminar psico o psicopega///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  eliminarPsicos(psicosId : string): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=23&psicosId='+psicosId);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=23&psicosId='+psicosId);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////Obtener Identificadores///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ObtenerAlumnosCursoACargo(): Observable<any> { 
    // console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=18&institucion='+this.institucionId+"&curso="+curso);
       return this._http.get('http://localhost:80/upnoticer/prueba/docente.php?op=0&docenteId='+this.rolId);
     }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////permiso para editar docente////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  permisoEditar(value : string): Observable<any> { 
    // console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=18&institucion='+this.institucionId+"&curso="+curso);
       return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=24&institucion='+this.institucionId+"&roleId="+value);
     }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////OBTENER CURSOS DADOS////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  cursosDados(value : string): Observable<any> { 
     //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=25&institucion='+this.institucionId+"&roleId="+value);
       return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=25&institucion='+this.institucionId+"&roleId="+value);
     }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////Agregar Asignatura//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  agregarAsignatura(nombre : string, curso : string, ident : string, roleId : string): Observable<any> { 
     //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=26&institucion='+this.institucionId+"&roleId="+roleId
     //+"&identifier="+ident+"&curso="+curso+"&name="+nombre);
       return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=26&institucion='+this.institucionId+"&roleId="+roleId
      +"&identifier="+ident+"&curso="+curso+"&name="+nombre);
     }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////Elimina asignatura/////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  eliminarAsignatura(value : string): Observable<any> { 
    console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=27&asignatura='+value);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=27&asignatura='+value);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////Elimina asignatura/////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ObtenerNombreyApellido(value : string): Observable<any> { 
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=28&roleId='+value);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=28&roleId='+value);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////Actualizar Datos Trabajador//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  actualizarDatosTrabajador(id : string, userId : string, nombre : string, apellido : string, contrato : string): Observable<any> { 
    console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=29&roleId='+id+"&nombre="+nombre
    +"&apellido="+apellido+"&contrato="+contrato+"&userId="+userId);
    return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=29&roleId='+id+"&nombre="+nombre
    +"&apellido="+apellido+"&contrato="+contrato+"&userId="+userId);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Actualizar Datos Trabajador con pass//////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  actualizarDatosTrabajadorPass(userId : string, pass : string): Observable<any> { 
    console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=299&userId='+userId+"&pass="+pass);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=299&userId='+userId+"&pass="+pass);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Obtener titulos profecional////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  obtenerCantidadTitulos(userId : string): Observable<any> { 
    console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=30&userId='+userId);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=30&userId='+userId);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Obtener titulos profecional////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  obtenerTitulos(userId : string): Observable<any> { 
    console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=300&userId='+userId);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=300&userId='+userId);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Eliminar titulos profecional///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  eliminarTitulos(tituloId : string): Observable<any> { 
    console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=31&tituloId='+tituloId);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=31&tituloId='+tituloId);
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////Agregar Nuevo Titulo////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  agregarTitulo(titulo : string, institucion : string, userId : string): Observable<any> { 
    console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=32&userId='+userId+"&titulo="+titulo
    +"&institucion="+institucion);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=32&userId='+userId+"&titulo="+titulo
    +"&institucion="+institucion);
    }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////obtener datos curso////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
obtenerInformacionCurso(cursoId : string): Observable<any> { 
  console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=33&cursoId='+cursoId);
    return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=33&cursoId='+cursoId+"&institucion="+this.institucionId);
  }
}
