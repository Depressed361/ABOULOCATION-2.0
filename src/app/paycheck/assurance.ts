
export class Assurance {
  id : string;

  name : string;

  price : number;

  description : string;

  constructor(id = '', name = '', price = 0, description = '') {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
  }
}
