import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap,catchError } from 'rxjs';
import { ville } from './booking-ville/ville';
import { VILLES } from './booking-ville/mock-ville';
import { vehicule } from './choose-car/vehicule';

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

/*changeCity(newCity: string): Observable<any> {
  return this.http.post(this.apiURL, { city: newCity });
}*/





}
