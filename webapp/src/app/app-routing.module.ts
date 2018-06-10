import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './home/login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { RegisterComponent } from './home/register/register.component';
import { InstitucionComponent } from './components/institucion/institucion.component';
import { HomeHomeComponent } from './home/home-home/home-home.component';



import { HomeInstitucionComponent } from './components/institucion/home-institucion/home-institucion.component';
import { EditarComponent } from './components/institucion/editar/editar.component';
import { ListarComponent } from './components/institucion/docente/listar/listar.component';
import { AgregarComponent } from './components/institucion/docente/agregar/agregar.component';
import { CursoAgregarComponent } from "./components/institucion/cursos/curso-agregar/curso-agregar.component"
import { CursoListarComponent } from "./components/institucion/cursos/curso-listar/curso-listar.component"
import { ComunicadoHistorialComponent } from './components/institucion/comunicados/comunicado-historial/comunicado-historial.component';
import { ComunicadoComunidadComponent } from './components/institucion/comunicados/comunicado-comunidad/comunicado-comunidad.component';
import { ComunicadoNivelComponent } from './components/institucion/comunicados/comunicado-nivel/comunicado-nivel.component';
import { ComunicadoCursoComponent } from './components/institucion/comunicados/comunicado-curso/comunicado-curso.component';
import { ComunicadoEspecificoComponent } from './components/institucion/comunicados/comunicado-especifico/comunicado-especifico.component';
import { PsicologoCrearComponent } from './components/institucion/psicologo/psicologo-crear/psicologo-crear.component';
import { PsicopedagogoCrearComponent } from './components/institucion/psicopedagogo/psicopedagogo-crear/psicopedagogo-crear.component';
import { DocenteInstitucionEditarComponent } from './components/institucion/docente/docente-institucion-editar/docente-institucion-editar.component';


//////////////////////////DOCENTE/////////////////////
import { DocenteHomeComponent } from './components/docente/docente-home/docente-home.component';
import { DocenteComponent } from './components/docente/docente.component';
import { AtrasosInasistenciaComponent } from './components/docente/atrasos-inasistencia/atrasos-inasistencia.component';


const routes: Routes = [
  {path:'', component: HomeComponent,
    children:[
      {path:'', component: HomeHomeComponent},
      {path:'register', component: RegisterComponent},
      {path:'login', component: LoginComponent},
  ]},
  {path:'Institucion', component: InstitucionComponent,
  children:[
    {path:'', component: HomeInstitucionComponent},
    {path:'institucion/Informacion', component: EditarComponent},
    {path:'institucion/Docente/Listado', component: ListarComponent},
    {path:'institucion/Docente/editar/:docente', component: DocenteInstitucionEditarComponent},
    {path:'institucion/Docente/Agregar', component: AgregarComponent},
    {path:'institucion/Cursos/Nuevo', component: CursoAgregarComponent},
    {path:'institucion/Cursos/Listado', component: CursoListarComponent},
    {path:'institucion/Comunicados', component: ComunicadoHistorialComponent},
    {path:'institucion/Comunicados/comunidad', component: ComunicadoComunidadComponent},
    {path:'institucion/Comunicados/Nivel', component: ComunicadoNivelComponent},
    {path:'institucion/Comunicados/Curso', component: ComunicadoCursoComponent},
    {path:'institucion/Comunicados/apoderado', component: ComunicadoEspecificoComponent},
    {path:'institucion/Psicologo/Agregar', component: PsicologoCrearComponent},
    {path:'institucion/Psicopedagogo/Agregar', component: PsicopedagogoCrearComponent},
  ]},
  {path:'docente', component: DocenteComponent,
    children:[
      {path:'', component: DocenteHomeComponent},
      {path:'docente/AtrasosInasistencias', component: AtrasosInasistenciaComponent},
  ]},
  {path:'**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }