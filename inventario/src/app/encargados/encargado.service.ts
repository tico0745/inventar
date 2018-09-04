import { Injectable } from '@angular/core';
import {ENCARGADOS } from './encargados.json';
import { Encargado } from './encargado';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class EncargadoService {

  private urlEndPoint: string = 'http://localhost:8080/api/encargados';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient) { }

  getEncargados(): Observable<Encargado[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Encargado[])
    );
  }

  create(encargado: Encargado) : Observable<Encargado>{
    return this.http.post<Encargado>(this.urlEndPoint, encargado, {headers: this.httpHeaders})
  }

  getEncargado(id): Observable<Encargado> {
    return this.http.get<Encargado>(`${this.urlEndPoint}/${id}`)
  }

  update(encargado: Encargado): Observable<Encargado>{
    return this.http.put<Encargado>(`${this.urlEndPoint}/${encargado.id}`, encargado, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Encargado>{
    return this.http.delete<Encargado>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }
}















