

export class Resa {

  vehicule: string;
  dateDebut: string;
  dateFin: string;
  user: number;
  assurance: any;

constructor  ( vehicule:string, dateDebut:string,dateFin:string, user: number ) {

  this.vehicule = vehicule;
  this.dateDebut = dateDebut;
  this.dateFin = dateFin;
  this.user = user;
  this.assurance = null;
}


}
