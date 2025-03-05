
export class User {
  _id: string;
  name: string;
  lastname: string;
  username: string;
  permisNumber: number;
  phoneNumber: number;
  address: string;
  email: string;
  password: string;
  postalCode: number;

  constructor(
    _id: string,
    email: string,
    password: string,
    name: string,
    lastname: string,
    permisNumber: number,
    address: string,
    phoneNumber: number,
    postalCode: number,
    username: string
  ) {
    this._id = _id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.permisNumber = permisNumber;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.postalCode = postalCode;
    this.username = username;
  }
}
