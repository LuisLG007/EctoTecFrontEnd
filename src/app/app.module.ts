import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material/material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_FORMATS, UserComponent } from './components/register/user/user.component';
import { ResourcesModule } from './modules/resources/resources/resources.module';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateModule, MomentDateAdapter, MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ErrorComponent } from './components/modal/error/error.component';
import { CompletadoComponent } from './components/register/completado/completado.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ErrorComponent,
    CompletadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ResourcesModule,
    MatMomentDateModule 
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
