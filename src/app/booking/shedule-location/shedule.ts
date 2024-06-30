// src/app/models/reservation.model.ts
export class Reservation {
  car_id: number;
  start_date: string;  // Utilisez le format ISO 8601 pour les dates (YYYY-MM-DD)
  end_date: string;
  customer_id: number;
  reservation_status: string;

  constructor(car_id: number, start_date: string, end_date: string, customer_id: number, reservation_status: string){
    this.car_id = car_id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.customer_id = customer_id;
    this.reservation_status = reservation_status;
  }
}
