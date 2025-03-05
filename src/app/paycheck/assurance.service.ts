import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssuranceService {
  assurancePremium!: boolean ;
  assuranceBasique!: boolean;

  constructor() { }
   setAssurancePremium(value: boolean){
     this.assurancePremium = value;
   }
   setAssuranceBasique(value: boolean){
     this.assuranceBasique = value;
   }

}
