import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
/*
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from "./../environments/environment";
*/
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './home/login/login.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { RegisterComponent } from './home/register/register.component';
import { InstitucionComponent } from './components/institucion/institucion.component';
import { HomeInstitucionComponent } from './components/institucion/home-institucion/home-institucion.component';
import { HomeHomeComponent } from './home/home-home/home-home.component';
import { HomeComponent } from "./home/home.component";

import { AuthService } from "./service/auth.service";
import { EditarComponent } from './components/institucion/editar/editar.component';
import { ListarComponent } from './components/institucion/docente/listar/listar.component';
import { AgregarComponent } from './components/institucion/docente/agregar/agregar.component';
import { CursoAgregarComponent } from "./components/institucion/cursos/curso-agregar/curso-agregar.component"
import { CursoListarComponent } from "./components/institucion/cursos/curso-listar/curso-listar.component"


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundPageComponent,
    RegisterComponent,
    InstitucionComponent,
    HomeInstitucionComponent,
    HomeHomeComponent, 
    HomeComponent,
    EditarComponent,
    ListarComponent,
    AgregarComponent,
    CursoAgregarComponent,
    CursoListarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
