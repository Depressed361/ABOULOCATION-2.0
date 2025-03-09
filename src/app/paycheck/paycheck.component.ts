import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutService } from '../aut.service';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AssuranceService } from './assurance.service';
import { LoctationService } from '../loctation.service';
import { VehiculeService } from '../booking/choose-car/vehicule.service';
import { vehicule } from '../booking/choose-car/vehicule';
import { Assurance } from './assurance';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-paycheck',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule, NgFor],
  templateUrl: './paycheck.component.html',
  styleUrl: './paycheck.component.css'
})
export class PaycheckComponent implements OnInit {

  ChooseAssurance!: FormGroup;
  DateDebutLocation!: Date;
  DateFinLocation!: Date;
  DureeLocation!: number;
  vehicule: vehicule | undefined;
  assurances: Assurance[] | any;
  showAssuranceButton: boolean = true;
  TotalPrice!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assuranceService: AssuranceService,
    private formBuilder: FormBuilder,
    private loctationService: LoctationService,
    private vehiculeService: VehiculeService,
    private autService: AutService
  ) { }

  ngOnInit(): void {
    this.ChooseAssurance = this.formBuilder.group({
      assurance: [null]
    });

    // Récupérer les informations du localStorage
    const storedDateDebut = localStorage.getItem('dateDebut');
    const storedDateFin = localStorage.getItem('dateFin');
    const storedDureeLocation = localStorage.getItem('dureeLocation');
    const storedVehiculeId = localStorage.getItem('vehiculeId');

    if (storedDateDebut && storedDateFin && storedDureeLocation) {
      this.DateDebutLocation = new Date(storedDateDebut);
      this.DateFinLocation = new Date(storedDateFin);
      this.DureeLocation = parseInt(storedDureeLocation, 10);
    } else {
      this.DateDebutLocation = this.loctationService.dateDebut;
      this.DateFinLocation = this.loctationService.dateFin;
      this.DureeLocation = this.loctationService.getDureeLocation();
    }

    const VehiculeId: string | null = storedVehiculeId || this.route.snapshot.paramMap.get('id');

    if (VehiculeId) {
      this.vehiculeService.getVehiculeById(VehiculeId)
        .subscribe(Vehicule => this.vehicule = Vehicule);
    }

    this.TotalPrice = this.vehiculeService.PricePerDay;

    this.GetAssurance();

    // Stocker les informations dans le localStorage
    localStorage.setItem('dateDebut', this.DateDebutLocation.toISOString());
    localStorage.setItem('dateFin', this.DateFinLocation.toISOString());
    localStorage.setItem('dureeLocation', this.DureeLocation.toString());
    if (VehiculeId) {
      localStorage.setItem('vehiculeId', VehiculeId);
    }
  }

  GetAssurance() {
    this.assuranceService.getAssurances().subscribe(
      Assurance => { this.assurances = Assurance; });
    this.showAssuranceButton = false;
  }

  calculateTotalPrice(): void {
    if (this.vehicule && this.DureeLocation) {
      this.TotalPrice = this.vehiculeService.PricePerDay * this.DureeLocation;
    }
  }

  onSubmit() {
    const selectedAssuranceId = this.ChooseAssurance.value.assurance;
    if (this.vehicule && this.vehicule._id && this.DateDebutLocation && this.DateFinLocation) {
      this.vehiculeService.reserveAndPay({
        vehiculeId: this.vehicule._id,
        userId: this.autService.getUserId(), // Assuming you have a method to get the user ID
        dateDebut: this.DateDebutLocation,
        dateFin: this.DateFinLocation,
        assurance: selectedAssuranceId
      }).subscribe(
        () => {
          this.router.navigate(['/confirmation']);
        }
      );
    } else {
      console.error('Véhicule ID ou dates sont indéfinis');
    }
  }
}











