import { ville } from "./booking-ville/ville";
// Class Voiture qui permet de gérer les voitures
export class Voiture {
  immatriculation: string;
  marque: string;
  modele: string;
  annee: number;
  prixJournalier: number;
  disponible: boolean;
  localisation: ville;

  constructor(immatriculation: string, marque: string, modele: string, annee: number, prixJournalier: number, localisation: ville) {
      this.immatriculation = immatriculation;
      this.marque = marque;
      this.modele = modele;
      this.annee = annee;
      this.prixJournalier = prixJournalier;
      this.disponible = true;
      this.localisation = localisation ;
  }

  louer(): void {
      if (this.disponible) {
          this.disponible = false;
      } else {
          throw new Error("La voiture n'est pas disponible.");
      }
  }



  retourner(): void {
      this.disponible = true;
  }

  estDisponible(): boolean {
      return this.disponible;
  }
}
// Class Client qui permet de gérer les clients

export class Client {
  idClient: string;
  nom: string;
  prenom: string;
  adresse: string;
  numeroPermis: string;

  constructor(idClient: string, nom: string, prenom: string, adresse: string, numeroPermis: string) {
      this.idClient = idClient;
      this.nom = nom;
      this.prenom = prenom;
      this.adresse = adresse;
      this.numeroPermis = numeroPermis;
  }

  sInscrire(): void {
      // Logique pour s'inscrire
  }

  louerVoiture(voiture: Voiture): ContratLocation {
      if (voiture.estDisponible()) {
          voiture.louer();
          return new ContratLocation(this, voiture);
      } else {
          throw new Error("La voiture n'est pas disponible.");
      }
  }
}

// Class ContratLocation qui permet de gérer les contrats de location

export class ContratLocation {
  static compteurContrats: number = 0;
  numeroContrat: string;
  client: Client;
  voiture: Voiture;
  dateDebut: Date;
  dateFin: Date | null;
  coutTotal: number;

  constructor(client: Client, voiture: Voiture) {
      this.numeroContrat = `C-${ContratLocation.compteurContrats++}`;
      this.client = client;
      this.voiture = voiture;
      this.dateDebut = new Date();
      this.dateFin = null;
      this.coutTotal = 0;
  }

  calculerCoutTotal(): number {
      if (!this.dateFin) {
          throw new Error("La date de fin n'est pas définie.");
      }
      const diffInMs = this.dateFin.getTime() - this.dateDebut.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      this.coutTotal = diffInDays * this.voiture.prixJournalier;
      return this.coutTotal;
  }

  terminerContrat(dateFin: Date): void {
      this.dateFin = dateFin;
      this.calculerCoutTotal();
      this.voiture.retourner();
  }
}
// Class Agence qui permet de gérer les voiture

class Agence {
  nomAgence: string;
  adresse: string;
  listeVoitures: Voiture[];

  constructor(nomAgence: string, adresse: string) {
      this.nomAgence = nomAgence;
      this.adresse = adresse;
      this.listeVoitures = [];
  }

  ajouterVoiture(voiture: Voiture): void {
      this.listeVoitures.push(voiture);
  }

  supprimerVoiture(immatriculation: string): void {
      this.listeVoitures = this.listeVoitures.filter(v => v.immatriculation !== immatriculation);
  }

  rechercherVoiture(critere: string): Voiture[] {
      return this.listeVoitures.filter(v =>
          v.marque.includes(critere) ||
          v.modele.includes(critere) ||
          v.immatriculation.includes(critere)
      );
  }
}
