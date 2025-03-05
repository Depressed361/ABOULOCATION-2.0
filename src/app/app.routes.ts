import { Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { BookingVilleComponent } from './booking/booking-ville/booking-ville.component';
import { SheduleLocationComponent } from './booking/shedule-location/shedule-location.component';
import { ChooseCarComponent } from './booking/choose-car/choose-car.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProfileComponent } from './profile/profile.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { PaycheckComponent } from './paycheck/paycheck.component';
import { authGuard } from './auth.guard';

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
  {path: 'paycheck/:id' , component: PaycheckComponent, canActivate: [authGuard]}




];
