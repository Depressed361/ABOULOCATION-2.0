import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutService } from '../aut.service';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AssuranceService } from './assurance.service';
import { LoctationService } from '../loctation.service';
import { VehiculeService } from '../booking/choose-car/vehicule.service';
import { vehicule } from '../booking/choose-car/vehicule';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-paycheck',
  standalone: true,
  imports: [ ReactiveFormsModule,NgIf,CommonModule  ],
  templateUrl: './paycheck.component.html',
  styleUrl: './paycheck.component.css'
})
export class PaycheckComponent implements OnInit {

  ChooseAssurance!: FormGroup;
  DateDebutLocation!: Date;
  DateFinLocation!: Date;
  DureeLocation!: number;
  vehicule:vehicule|undefined;


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


    ;

  }
 onSubmit(){
  if(this.ChooseAssurance.value.AssurancePremium==true){
     const assurancePremium = this.ChooseAssurance.value.AssurancePremium;
      this.assuranceService.setAssurancePremium(assurancePremium);
    this.router.navigate(['assurancePremium']);

  }
  else if(this.ChooseAssurance.value.AssuranceBasique){

    const assuranceBasique = this.ChooseAssurance.value.AssuranceBasique;
    this.assuranceService.setAssuranceBasique(assuranceBasique);
    this.router.navigate(['assuranceBasique']);
  }

  else{
    this.router.navigate(['paycheck']);
  }
}
}












