import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../service/auth.service";

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
public listado:string[];
  constructor(private auth : AuthService) { 
    this.listado= new Array();
    this.auth.listarDocentes().subscribe(result =>{
     for(var a of result)
     {
      this.listado.push(a);
     }
    })
  }

  ngOnInit() {
  }

}
