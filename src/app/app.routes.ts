import { Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { BookingVilleComponent } from './booking/booking-ville/booking-ville.component';
import { SheduleLocationComponent } from './booking/shedule-location/shedule-location.component';
import { ChooseCarComponent } from './booking/choose-car/choose-car.component';


export const routes: Routes = [
  { path: '', redirectTo: 'Acceuil', pathMatch: 'full' },
  {path:'Acceuil', component: AcceuilComponent},
  {path:'BookingVille', component: BookingVilleComponent},
  //{path:'BookingVehicule', component: BookingVehiculeComponent}
  {path:'shedule-location/:ville', component: SheduleLocationComponent},
  {path:'disponibilite/:ville?:dateDebut&:dateFin', component: ChooseCarComponent}



];
