import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Servicios
import { authGuard } from './services/loginService/auth-guard.service';

//Componentes
import { LoginComponent } from './login/login/login.component';
import {RegisterUserComponent  } from './register/register-user/register-user.component';
import{ SelectRegisterComponent} from './register/select-register/select-register.component';
import {RegisterRefereeComponent} from './register/register-referee/register-referee.component';
import { RegisterSportCenterComponent } from './register/register-sport-center/register-sport-center.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'registerUser', component: RegisterUserComponent},
  { path: 'registerReferee', component: RegisterRefereeComponent},
  { path: 'registerSportCentre', component: RegisterSportCenterComponent},
  { path: 'selectRegister', component: SelectRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
