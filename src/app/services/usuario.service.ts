import { Usuario } from './../model/usuario';
import { Localidad } from './../model/localidad';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalidadResponse, UsuarioResponse } from '../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  private URL_API: String = 'https://localhost:44337/api/localidad/';
  private URL_API_USUARIO: String = 'https://localhost:44337/api/usuario/';

  public Agregar(Usuario: Usuario):Observable<UsuarioResponse>
  {
    Usuario.id = "00000000-0000-0000-0000-000000000000";
    
    return this.http.post<UsuarioResponse>(this.URL_API_USUARIO + "Agregar", Usuario);
  }

  public obtenerLocalidades():Observable<Localidad[]>
  {
    return this.http.get<LocalidadResponse>(this.URL_API + "ObtenerLocalidades").
            pipe(
              map( respuesta => {
                return respuesta.datos.map( localidad =>  new Localidad(localidad))
              })       
            )
  }
  
  
}
