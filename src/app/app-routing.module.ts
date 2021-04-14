import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompletadoComponent } from './components/register/completado/completado.component';
import { UserComponent } from './components/register/user/user.component';

const routes: Routes = [
  { path: 'inicio', component: UserComponent },
  { path:'completado', component: CompletadoComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio'},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
