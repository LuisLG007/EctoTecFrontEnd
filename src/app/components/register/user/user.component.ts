import { Localidad, Usuario } from './../../../model/index';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../../modal/error/error.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  constructor(
    private usuarioService : UsuarioService,
    private formBuilder: FormBuilder,
    private MatDialog: MatDialog,
    private router: Router,   
    ) { 
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 100, 0, 1);     
    }


  //#region Observable
  private Subscription: Subscription = new Subscription();
  //#endregion
  public localidades: Localidad[] = [];
  public Localidad: Localidad;
  public myForm: FormGroup;
  public usuario: Usuario = new Usuario();

  ngOnInit(): void {
    this.ObtenerLocallidades();
    this.buildForm();   
  }

  public ObtenerLocallidades(): void{

    this.Subscription.add(
      this.usuarioService.obtenerLocalidades().subscribe( localidades => {
        this.localidades = localidades;
        console.log(this.localidades);
        this.searchFilterProduct();
      })
    );

  }

  /*******************************************************************************************************************************************************/  

  public filteredOptions: Observable<Localidad[]>;

  public displayFnLocalidad(localidad: Localidad[]): (ciudad : number) => string{
    return (ciudad: number) => {
      const correspondingOption = Array.isArray( localidad ) ? localidad.find( localidad => localidad.idciudad === ciudad ): null;
      return correspondingOption ? correspondingOption.LocalidadCompleta : '';
    }
  }

  searchFilterProduct():void{
    this.filteredOptions = this.myForm.controls.idciudad.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLocalidad(value))
    )
  }
  _filterLocalidad(value: string): Localidad[]{
    if (value.length>=3){
      value = value.toString().toLowerCase();
    return this.localidades.filter((item: Localidad) => 
      item.ciudadNombre.toLowerCase().includes(value) || item.estadoNombre.toLowerCase().includes(value));
    }else{
      return [];
    }

  }

   /*******************************************************************************************************************************************************/   
   public pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/);   
   
   public localidadInfo(Localidad: Localidad):void{
     this.Localidad = Localidad; 
     console.log(this.Localidad);
    }

  //#region Submit Form
  public onSubmit($event: Event): void {
    this.usuario = this.myForm.value;   
    console.log(this.usuario);

    if (this.myForm.invalid){
      this.myForm.markAllAsTouched();
      this.openDialog();
      return;
    }else{
      this.Subscription.add(
        
        this.usuarioService.Agregar(this.usuario).subscribe( resp => {
         
          if (resp.bandera) {
            console.log("Se ha guardado con exito");

            sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
            sessionStorage.setItem('localidad', JSON.stringify(this.Localidad));
            this.router.navigateByUrl('completado');

          } else {
            console.log("Ha ocurrido un error", resp.mensaje);
          }
        })
      );
    }


    
  } 
  //#endregion
  public clearForm(): void
  {
    this.buildForm();
  }
  private buildForm(): void
  {
    this.myForm = this.formBuilder.group({
        id:[''],
        nombre:['', [Validators.required]],
        email: ['', [Validators.required, 
          Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$")]],
        telefono: ['', [Validators.required, Validators.pattern(/^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/)]],
        fecha:[Date.now, [Validators.required]],
        idciudad:['', [Validators.required]],
      }
    );
  }
  
  get f() { return this.myForm.controls; }


  /***************************************************************************************************+*/
  public openDialog( ): void
  {
    const config = {
       width: '300',
        disableClose: true,
        data: this.myForm
    }
    const dialogRef = this.MatDialog.open( ErrorComponent, config );
    this.Subscription.add(
      dialogRef.afterClosed().subscribe( res => {
          
      })
    );
  }

}
export const MY_FORMATS = {
  parse: {
    dateInput: "LL"
  },
  display: {
    dateInput: "DD-MMM-YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};
