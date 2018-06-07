import { Injectable } from '@angular/core';
import { uno } from "./modelos";
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
  private telefono : string[];

  constructor(
    public router : Router,
    public _http : HttpClient
  ) { 
    this.telefono = new Array();
  }

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
  public get getTelefono(){
    return this.telefono;
  }
  setTelefono(telefonos : string){
    this.telefono.push(telefonos);
  }
  nullTelefono(){
    this.telefono = null;
    this.telefono = new Array();
  }

  /*registerUser(email: string, password:string){
    /*this._http.get('http://localhost:80/upnoticer/prueba/insertarUser.php?op=2&email='+
    this.email+"&pass="+password).subscribe(res => {
      console.log(res);
    });/*
    return new Promise((resolve, reject) =>{
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( null,
    err => reject( err ));
    })
    console.log("AOOOSO");
}*/

  signInEmail(email: string, password:string): Observable<any>{
    return this._http.get('http://localhost/upnoticer/prueba/insertarUser.php?op=2&email='+
    email+"&pass="+password);
  }

  getTelefonos(): Observable<any>{
    return this._http.get('http://localhost/upnoticer/prueba/insertarUser.php?op=22&institucion='+this.institucionId);
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

  editarAdministradortelefono(): Observable<any> {
    return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=2&institution='+this.institucionId);
  }

  updateAdministrador(nombre : string, direccion : string): Observable<any> {
    console.log(nombre + " >>> "+ this.intitutionName +" ||||| "+direccion + " >>> "+ this.institutionAddress);
    if(nombre != this.intitutionName || direccion != this.institutionAddress)
    {
      console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=3&institution='+this.institucionId+"&nombre="+nombre+"&direccion="+direccion);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=3&institution='+this.institucionId+"&nombre="+nombre+"&direccion="+direccion);
    
    }
  }

  updateAdministradortelefono(telefono : string): Observable<any> {
    return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=4&institution='+this.institucionId+"&telefono="+telefono);
  }

  listarDocentes(): Observable<any> {
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=5&institucion='+this.institucionId);
      return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=5&institucion='+this.institucionId);
    }
    listarDocentesSinCursosAsignados(): Observable<any> { //Que no esta asignado a ningun curso
      //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=7&institucion='+this.institucionId);
        return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=7&institucion='+this.institucionId);
      }

  agregarDocente(nombre : string, apellido : string, email : string, pass : string, contrato: Date, type : string): Observable<any> {
    return this._http.get('http://localhost:80/upnoticer/prueba/insertarUser.php?op=3&insitution='+this.institucionId+
      "&nombre="+nombre+"&apellido="+apellido+"&dEmail="+email+"&pass="+pass+"&contrato="+contrato+"&type="+type);
    
  }

  agregarCurso(nivel : string, identificador : string, profesor : string): Observable<any> {
    //console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=8&insitution='+this.institucionId+"&nivel="+nivel+"&identificador="+identificador+"&profesor="+profesor);
  return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=8&insitution='+this.institucionId+
    "&nivel="+nivel+"&identificador="+identificador+"&profesor="+profesor);
  }
  agregarAlumnoCurso(curso : string, nombre : string, apelido : string): Observable<any> {
    console.log('http://localhost:80/upnoticer/prueba/administrador.php?op=88&curso='+curso+
    "&nombre="+nombre+"&apellido="+apelido);
    return this._http.get('http://localhost:80/upnoticer/prueba/administrador.php?op=88&curso='+curso+
      "&nombre="+nombre+"&apellido="+apelido);
  }
    
  
}
