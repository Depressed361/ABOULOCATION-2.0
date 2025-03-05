import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutService } from '../aut.service';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AssuranceService } from './assurance.service';
import { LoctationService } from '../loctation.service';
import { VehiculeService } from '../booking/choose-car/vehicule.service';
import { vehicule } from '../booking/choose-car/vehicule';
import { ActivatedRoute } from '@angular/router';
import { Assurance } from './assurance';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-paycheck',
  standalone: true,
  imports: [ ReactiveFormsModule,NgIf,CommonModule ,NgFor ],
  templateUrl: './paycheck.component.html',
  styleUrl: './paycheck.component.css'
})
export class PaycheckComponent implements OnInit {

  ChooseAssurance!: FormGroup;
  DateDebutLocation!: Date;
  DateFinLocation!: Date;
  DureeLocation!: number;
  vehicule:vehicule|undefined;
  assurances : Assurance[]|any;
  showAssuranceButton: boolean = true;
  TotalPrice!: number;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private assuranceService: AssuranceService,
    private formBuilder: FormBuilder,
    private loctationService: LoctationService,
    private vehiculeService: VehiculeService


  ) {

   }

  ngOnInit(): void {
    this.ChooseAssurance= this.formBuilder.group({
      AssurancePremium: [Boolean],
      AssuranceBasique: [Boolean],
    })

    this.DateDebutLocation = this.loctationService.getdateDebut();
    this.DateFinLocation = this.loctationService.getDateFin();
    this.DureeLocation = this.loctationService.getDureeLocation();
    const VehiculeId:string|null = this.route.snapshot.paramMap.get('id');

    if (VehiculeId){
     this.vehiculeService.getVehiculeById (VehiculeId)
     .subscribe (Vehicule => this.vehicule = Vehicule);

   }


   this.TotalPrice=this.vehiculeService.PricePerDay ;




  }



 GetAssurance(){ this.assuranceService.getAssurances().subscribe(

        Assurance => {this.assurances = Assurance;});
        this.showAssuranceButton = false;

}

calculateTotalPrice(): void {
  if (this.vehicule && this.DureeLocation) {
    this.TotalPrice = this.vehiculeService.PricePerDay * this.DureeLocation;
  }
}

 onSubmit(){
}
}











