import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap,catchError } from 'rxjs';
import { ville } from './booking-ville/ville';
import { VILLES } from './booking-ville/mock-ville';
import { vehicule } from './choose-car/vehicule';
import { Resa } from './location-form/resa';

@Injectable({
  providedIn: 'root'
})
export class BookingService {



   private apiURL = 'http://localhost:5000/post';

  constructor(private http:HttpClient) { }

  getVilles():Observable <ville[]> {
    return this.http.get<ville[]>(`${this.apiURL}/BookingVille`).pipe(
      tap((response) => console.log(response)),
      catchError(error => {
        console.log('error',error);
        return of([]);
      })
    );

  }

getVehicules():Observable <vehicule[]> {

  return this.http.get<vehicule[]>(`${this.apiURL}/Vehicules/disponibilite/:name`).pipe(
    tap((response) => console.log(response)),
    catchError(error => {
      console.log('error',error);
      return of([]);
    })
  );


}

reserveAndPay(data: { vehiculeId: string|undefined, userId: string, dateDebut: Date, dateFin: Date, assurance?: boolean }): Observable<any> {
  const localStorageToken = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ` ${localStorageToken}` // Ajouter le token d'authentification dans les headers
  });
  return this.http.post<any>(`${this.apiURL}/reserve-and-pay`, data,  { headers }).pipe(
    tap(response => {
      console.log('Réservation et paiement réussis', response);
    }),
    catchError(this.handleError)
  );
}


 handleError(error: any) {
  console.log('error', error);
  return of([]);

}
}
