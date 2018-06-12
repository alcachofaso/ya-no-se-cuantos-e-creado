import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../service/auth.service";
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-docente-mensaje-detalle',
  templateUrl: './docente-mensaje-detalle.component.html',
  styleUrls: ['./docente-mensaje-detalle.component.css']
})
export class DocenteMensajeDetalleComponent implements OnInit {
  private id : string;
  public rolId : string;
  public titulo : string;
  public fecha : string;
  public tipo : string;
  public incluye : string;
  public relacion : string;
  public nombre : string;
  public apellido : string;

  public mensaje: string;

  public listadoMensajes : string[];

  public ferror: boolean;


  constructor(private _router : ActivatedRoute, private router : Router, private auth : AuthService) { 
    this.id = _router.snapshot.paramMap.get('mensaje');
    this.ferror = false;

    this.auth.permisoEditar(this.id).subscribe(result=>{
      auth.inforacionMensajeEspecifico(this.id).subscribe(r=>{
        this.titulo = r['titulo'];
        this.tipo = r['tipo'];
        this.fecha = r['fecha'];
        this.incluye = r['incluye'];
        this.relacion = r['relacion'];
        this.nombre = r['nombre'];
        this.apellido = r['apellido'];
        this.rolId = auth.getRolId;
        this.traerMensajes();
        
      })
  });
  }
  traerMensajes(){
    this.listadoMensajes = new Array();
    this.auth.contenidoMensajeEspecifico(this.id).subscribe(r=>{
      for(let t of r){
        if(t['envia'] != this.rolId)
        {
          this.auth.detalleMensajeEspecifico(this.id,t['envia']).subscribe(r=>{
            this.listadoMensajes.push(JSON.parse('{ "contenido":"'+ t['contenido'] +'", "fecha":"'+t['fecha']+'", "envia":"'+t['envia']
            +'", "nombre":"'+t['nombre'] +'", "apellido":"'+t['apellido'] +'", "nombreApoderado":"'+r['nombreApoderado'] +'", "apellidoApoderado":"'+r['apellidoApoderado']
            +'", "estudianteNombre":"'+r['estudianteNombre'] +'", "estudianteApelldio":"'+r['estudianteApelldio']+'"}'));
          })
        }
        else{
          this.listadoMensajes.push(t);
        }
      }
    })
  }
  esconder(){
    this.ferror = false;
  }

  enviarMensaje(){
    this.esconder();
    if(this.mensaje!= undefined){
      this.auth.enviarContenidoMensaje(this.id,this.rolId,this.mensaje).subscribe(r=>{
        this.mensaje = undefined;
        this.traerMensajes();
      });
    }else{
      this.ferror = true;
    }
  }

  ngOnInit() {
  }

mostrar(){
  console.log(this.listadoMensajes);
}








}
