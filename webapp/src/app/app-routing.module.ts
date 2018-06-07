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
    {path:'institucion/Docente/Agregar', component: AgregarComponent},
    {path:'institucion/Cursos/Nuevo', component: CursoAgregarComponent},
    {path:'institucion/Cursos/Listado', component: CursoListarComponent},
  ]},
  
  {path:'**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }