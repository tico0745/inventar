import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
 import {HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { EncargadosComponent } from './encargados/encargados.component';
import { EncargadoService} from './encargados/encargado.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './encargados/form.component';
import { FormsModule } from '@angular/forms'

const routes: Routes = [
  {path: '', redirectTo: '/encargados', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'encargados', component: EncargadosComponent},
  {path: 'encargados/form', component: FormComponent},
  {path: 'encargados/form/:id', component: FormComponent}
  
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    EncargadosComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [EncargadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
