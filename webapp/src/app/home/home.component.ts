import { Component, OnInit } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public _http : Http) { }

  ngOnInit() {
  }

  insert() {
    
  this._http.get("http://localhost:80/upnoticer/prueba/insertarUser.php").subscribe(res => console.log(res.text()));
    
    
    
    /*.map(res => res.json());
    console.log("despues del registro");*/
    }

}
