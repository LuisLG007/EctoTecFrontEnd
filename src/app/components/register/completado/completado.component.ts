import { Component, OnInit } from '@angular/core';
import { Localidad, Usuario } from 'src/app/model';

@Component({
  selector: 'app-completado',
  templateUrl: './completado.component.html',
  styleUrls: ['./completado.component.scss']
})
export class CompletadoComponent implements OnInit {
 

 public Usuario: Usuario;
 public Localidad: Localidad;


  constructor() {
    this.Usuario = new Usuario();
    this.Usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');

    this.Localidad = new Localidad(JSON.parse(sessionStorage.getItem('localidad')|| '{}'));

    console.log(JSON.parse(sessionStorage.getItem('usuario') || '{}'))
   }

  ngOnInit(): void {
  }

}
