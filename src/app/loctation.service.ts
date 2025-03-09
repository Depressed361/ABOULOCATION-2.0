import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoctationService {

  dateDebut!: Date;
  dateFin!: Date;

  constructor() {

   }


    setDateDebut(dateDebut:  Date){
      this.dateDebut =new Date (dateDebut);
}

    setDateFin(dateFin: Date){
      this.dateFin = new Date (dateFin);
}

getDureeLocation(): number {
  if (this.dateDebut && this.dateFin) {
    return (this.dateFin.getTime() - this.dateDebut.getTime()) / (1000 * 60 * 60 * 24); // Durée en jours
  }
  return 0;
}

getdateDebut(){
  return this.dateDebut;

}

getDateFin(){
  return this.dateFin;
}




// Compare this snippet from ABOULOCATION-2.0/src/app/booking-ville/ville.ts:

}
