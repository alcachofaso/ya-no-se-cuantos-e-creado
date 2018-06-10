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
import { CursoListarComponent } from "./components/institucion/cursos/curso-listar/curso-listar.component";
import { ComunicadoHistorialComponent } from './components/institucion/comunicados/comunicado-historial/comunicado-historial.component';
import { ComunicadoComunidadComponent } from './components/institucion/comunicados/comunicado-comunidad/comunicado-comunidad.component';
import { ComunicadoNivelComponent } from './components/institucion/comunicados/comunicado-nivel/comunicado-nivel.component';
import { ComunicadoCursoComponent } from './components/institucion/comunicados/comunicado-curso/comunicado-curso.component';
import { ComunicadoEspecificoComponent } from './components/institucion/comunicados/comunicado-especifico/comunicado-especifico.component';
import { PsicologoCrearComponent } from './components/institucion/psicologo/psicologo-crear/psicologo-crear.component';
import { PsicopedagogoCrearComponent } from './components/institucion/psicopedagogo/psicopedagogo-crear/psicopedagogo-crear.component';
import { DocenteHomeComponent } from './components/docente/docente-home/docente-home.component';
import { DocenteComponent } from './components/docente/docente.component';
import { AtrasosInasistenciaComponent } from './components/docente/atrasos-inasistencia/atrasos-inasistencia.component';
import { DocenteInstitucionEditarComponent } from './components/institucion/docente/docente-institucion-editar/docente-institucion-editar.component';
import { CursoEditarComponent } from './components/institucion/cursos/curso-editar/curso-editar.component';


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
    ComunicadoHistorialComponent,
    ComunicadoComunidadComponent,
    ComunicadoNivelComponent,
    ComunicadoCursoComponent,
    ComunicadoEspecificoComponent,
    PsicologoCrearComponent,
    PsicopedagogoCrearComponent,
    DocenteHomeComponent,
    DocenteComponent,
    AtrasosInasistenciaComponent,
    DocenteInstitucionEditarComponent,
    CursoEditarComponent,
    
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
