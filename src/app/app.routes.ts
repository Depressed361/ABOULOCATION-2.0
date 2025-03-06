import { Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { BookingVilleComponent } from './booking/booking-ville/booking-ville.component';
import { SheduleLocationComponent } from './booking/shedule-location/shedule-location.component';
import { ChooseCarComponent } from './booking/choose-car/choose-car.component';
import { ConnexionComponent } from './login/connexion/connexion.component';
import { ProfileComponent } from './profile/profile.component';
import { InscriptionComponent } from './login/inscription/inscription.component';
import { PaycheckComponent } from './paycheck/paycheck.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ForgotPsswordComponent } from './login/forgot-pssword/forgot-pssword.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Acceuil', pathMatch: 'full' },
  {path:'Acceuil', component: AcceuilComponent},
  {path:'BookingVille', component: BookingVilleComponent},
  {path: 'connexion', component: ConnexionComponent},
  //{path:'BookingVehicule', component: BookingVehiculeComponent}
  {path:'shedule-location/:ville', component: SheduleLocationComponent},
  {path:'disponibilite/:ville?:dateDebut&:dateFin', component: ChooseCarComponent},
  {path: 'profile/:id' , component: ProfileComponent, canActivate: [authGuard]},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'paycheck/:id' , component: PaycheckComponent, canActivate: [authGuard]},
  {path: 'login' , component: LoginComponent },
  {path: 'forgot-password' , component: ForgotPsswordComponent }





];
