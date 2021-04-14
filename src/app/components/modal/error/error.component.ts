import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ErrorComponent>, @Inject(MAT_DIALOG_DATA)public form: FormGroup) { }

  ngOnInit(): void {
  }

  
  public CerrarModal(): void{
    this.dialogRef.close();
  }

 
  //#region  Get
  get nombre(){
    return this.form.get('nombre');
  }
  get email(){
    return this.form.get('email');
  }
  get telefono(){
    return this.form.get('telefono');
  }
  get fecha(){
    return this.form.get('fecha');
  }
  get idciudad(){
    return this.form.get('idciudad');
  } 
  
  //#endregion
}
