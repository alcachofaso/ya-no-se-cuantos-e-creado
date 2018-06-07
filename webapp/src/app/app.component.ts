import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public authService: AuthService, public route:Router) {
   switch(this.authService.getRoleType){
     case '0': this.route.navigate(["/Institucion"]);
   }
  }
}
