import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { vehicule } from './vehicule';
import { VehiculeService } from './vehicule.service'
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SheduleLocationComponent } from '../shedule-location/shedule-location.component';



@Component({
  selector: 'app-choose-car',
  standalone: true,
  imports: [NgFor, NgIf ],
  templateUrl: './choose-car.component.html',
  styleUrl: './choose-car.component.css'
})
export class ChooseCarComponent implements OnInit {

  vehiculesList!: vehicule[]  ; // on récupère la liste des véhicules
  vehicule!: vehicule;
  ville: string | any;
  dateFin: string| any;
  heureFin: string|any;
  dateDebut: string|any;
  heureDebut: string|any;
  pricePerDay: [vehicule["pricePerDay"]]|any ;
  noVehiculesAvailable: boolean = false;
  private routeSub: Subscription | undefined;

  ajustPricePerDay(pricePerDay: number, diffDays: number): number {
    return pricePerDay * diffDays;
  }


  log(response: any) {
    console.log(response);
  }
  constructor(
    private vehiculeService: VehiculeService,
    private router: Router,
    private route: ActivatedRoute

  ) {

  }


    ngOnInit() {
      this.routeSub = this.route.paramMap.subscribe(params => {
        this.ville = params.keys;

        if (this.ville.length > 0) {
          const Ville = this.ville[0];
          this.ville = params.get(Ville);
        }
      });
      this.dateDebut = this.route.snapshot.queryParams['dateDebut'];
      this.dateFin = this.route.snapshot.queryParams['dateFin'];
      this.heureDebut = this.route.snapshot.queryParams['heureDebut'];
      this.heureFin = this.route.snapshot.queryParams['heureFin'];

      console.log(this.ville);
      console.log(this.dateDebut);
      console.log(this.dateFin);
      console.log(this.heureDebut);
      console.log(this.heureFin);


      this.vehiculeService.getVehiculesAvaliable(this.ville, this.dateDebut, this.heureDebut, this.dateFin, this.heureFin)
      .subscribe(vehiculesList => {
        if (Array.isArray(vehiculesList) && vehiculesList.length > 0) {
          this.vehiculesList = vehiculesList; // on récupère la liste des véhicules disponibles

          const debut = new Date(this.dateDebut);
          const fin = new Date(this.dateFin);
          const diff = fin.getTime() - debut.getTime();
          const diffDays = diff / (1000 * 3600 * 24);

          this.vehiculesList.forEach((vehicule: vehicule) => {
            vehicule.pricePerDay = this.ajustPricePerDay(vehicule.pricePerDay, diffDays);
            this.vehiculeService.StockPricePerDay(vehicule.pricePerDay);
          });
        } else {
          this.noVehiculesAvailable = true;
          console.error('Aucun véhicule disponible', vehiculesList);
        }
      });
  }



   ngOnDestroy() {
    // Nettoyer l'abonnement
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }




   goToContrat( vehicule: vehicule) {

      this.vehiculeService.setChoosedVehicule(this.vehicule); // on enregistre le véhicule choisi
      this.router.navigate(['/paycheck',vehicule._id]); // on navigue vers la route /vehicule/id
    }



  }
