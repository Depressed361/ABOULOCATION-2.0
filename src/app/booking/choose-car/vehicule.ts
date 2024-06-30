import { ville } from '../booking-ville/ville';

export class vehicule {
    _id   :number;
    picture: string;
    immatriculation: string;
    make: string;
    modele: string;
    annee: number;
    pricePerDay: number;
    disponible: boolean;
    name: string;

    constructor(_id: number, picture :string, immatriculation: string, make: string, modele: string, annee: number, pricePerDay: number, name: string) {
        this._id=_id
        this.picture = picture;
        this.immatriculation = immatriculation;
        this.make = make;
        this.modele = modele;
        this.annee = annee;
        this.pricePerDay = pricePerDay;
        this.disponible = true;
        this.name = name;
    }
}
