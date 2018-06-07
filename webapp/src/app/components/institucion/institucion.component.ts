import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent implements OnInit {

  constructor(public authService: AuthService, public route:Router) {
     }

  ngOnInit() {
    /*this.authService.getAuth().subscribe(auth =>{ 
      this.authService.uid = auth.uid;
    })*/
    if(this.authService.getRoleType != '0'){
      this.route.navigate(["/login"]);
    }
  }

  onClickLogOut(){
    this.authService.singOut();
  }

}
