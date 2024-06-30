export class ville  {
   id: number;
   name: string;
   codePostal: number;
   image: string;

    constructor(id: number, name: string, codePostal:number, image: string) {
        this.id = id;
        this.name = name;
        this.codePostal = codePostal;
        this.image = image;
    }
}
