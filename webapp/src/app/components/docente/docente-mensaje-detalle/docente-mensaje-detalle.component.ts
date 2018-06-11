import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-docente-mensaje-detalle',
  templateUrl: './docente-mensaje-detalle.component.html',
  styleUrls: ['./docente-mensaje-detalle.component.css']
})
export class DocenteMensajeDetalleComponent implements OnInit {
  private id : string;

  constructor(private _router : ActivatedRoute, private router : Router, private auth : AuthService) { 
    this.id = _router.snapshot.paramMap.get('curso');
    this.auth.permisoEditar(this.id).subscribe(result=>{
    if(result['resultado'] == "200"){ 
      this.router.navigate(["/Institucion/docente/Mensajes"]);
    }else{
      }
  });
  }

  ngOnInit() {
  }

}
