import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from "./auth.service";

@Injectable()
export class SendEmailService {

  constructor(private _http : HttpClient, private _auth : AuthService) { }

  createAccount(email : string, pass : string, type: string, accion : string, insti : string){
    if(email != undefined && pass != undefined && accion != undefined){
      if(insti == null)
      {
        insti = this._auth.getIntitutionName;
      }
      return this._http.get('http://www.upnoticer.com/prueba/email.php?op='+accion+'&email='+email+'&pass='+pass+'&type='+type+'&insti='+insti);
    }
  }
}
