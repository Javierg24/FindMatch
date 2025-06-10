import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterUserComponent } from './register/register-user/register-user.component';
import { RegisterRefereeComponent } from './register/register-referee/register-referee.component';
import { RegisterSportCenterComponent } from './register/register-sport-center/register-sport-center.component';
import { SelectRegisterComponent } from './register/select-register/select-register.component';
import { TeamInfoComponent } from './Players/Teams/team-info/team-info.component';
import { ProfileComponent } from './Players/Profile/profile/profile.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { MatchesComponent } from './Players/Matches/matches/matches.component';
import { StoreComponent } from './Players/Store/store/store.component';
import { TeamComponent } from './Players/Teams/team/team.component';
import { SearchTeamComponent } from './Players/Teams/search-team/search-team.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    RegisterRefereeComponent,
    RegisterSportCenterComponent,
    SelectRegisterComponent,
    TeamInfoComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    MatchesComponent,
    StoreComponent,
    TeamComponent,
    SearchTeamComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
