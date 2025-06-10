import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Servicios
import { AuthGuardService } from './services/loginService/auth-guard.service';

// Componentes
import { LoginComponent } from './login/login/login.component';
import { RegisterUserComponent } from './register/register-user/register-user.component';
import { SelectRegisterComponent } from './register/select-register/select-register.component';
import { RegisterRefereeComponent } from './register/register-referee/register-referee.component';
import { RegisterSportCenterComponent } from './register/register-sport-center/register-sport-center.component';
import { ProfileComponent } from './Players/Profile/profile/profile.component';
import { TeamInfoComponent } from './Players/Teams/team-info/team-info.component';
import { MatchesComponent } from './Players/Matches/matches/matches.component';
import { StoreComponent } from './Players/Store/store/store.component';
import { TeamComponent } from './Players/Teams/team/team.component';
import { SearchTeamComponent } from './Players/Teams/search-team/search-team.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registerUser', component: RegisterUserComponent },
  { path: 'registerReferee', component: RegisterRefereeComponent },
  { path: 'registerSportCentre', component: RegisterSportCenterComponent },
  { path: 'selectRegister', component: SelectRegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'teams', component: TeamInfoComponent, canActivate: [AuthGuardService] },
  { path: 'matches', component: MatchesComponent, canActivate: [AuthGuardService] },
  { path: 'store', component: StoreComponent, canActivate: [AuthGuardService] },
  { path: 'team/:id', component: TeamComponent, canActivate: [AuthGuardService] },
  { path: 'searchTeam', component: SearchTeamComponent, canActivate: [AuthGuardService] },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
  { path: 'termsOfService', component: TermsOfServiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
