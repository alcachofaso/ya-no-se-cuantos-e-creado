import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-psico-detalle',
  templateUrl: './psico-detalle.component.html',
  styleUrls: ['./psico-detalle.component.css']
})
export class PsicoDetalleComponent implements OnInit {

  private id : string;

  constructor(private _router : ActivatedRoute, private router : Router, private auth : AuthService) { 
    this.id = _router.snapshot.paramMap.get('id');
  }

  volver(){
      this.router.navigate(["/psico"]);
  }
  ngOnInit() {
  }

}
