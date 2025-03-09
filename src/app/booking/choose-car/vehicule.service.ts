import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of,tap,catchError } from 'rxjs';
import { vehicule } from './vehicule';
import { map } from 'rxjs/operators';
import { Resa } from '../location-form/resa';


@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  vehicule!: vehicule ;
  PricePerDay!: number;


  private apiURL = 'http://localhost:5000/post';


  constructor(private http:HttpClient) { } // Create an empty constructor

  StockPricePerDay(pricePerDay: number) {
    this.PricePerDay = pricePerDay;
  }

//Créer un véhicule
    createVehicule(vehicule: vehicule): Observable<vehicule|undefined> {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      return this.http.post<vehicule>(`${this.apiURL}/createVehicule`, vehicule).pipe(
        tap((response) => console.log(response)),
        catchError(error => {
          console.log('error', error);
          return of(undefined);
        })
      );
    }
//Récupérer la liste des véhicules
    getVehicules(): Observable<vehicule[]> {
      return this.http.get<vehicule[]>(`${this.apiURL}/Vehicules/disponibite/:name`).pipe(
        tap((response) => console.log(response)),
        catchError(error => {
          console.log('error',error);
          return of([]);
          })

        )}



//Supprimer un véhicule

    deleteVehicule(vehiculeid: number): Observable<null|{}> {
      return this.http.delete(`${this.apiURL}/vehicules/${vehiculeid}`).pipe(
        tap((response) => console.log(response)),
        catchError(error => {
          console.log('error',error);
          return of(null);
         })

         )
    }

    reserveAndPay(data: { vehiculeId: string|undefined, userId: string, dateDebut: Date, dateFin: Date, assurance?: boolean }): Observable<any> {
      const localStorageToken = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ` ${localStorageToken}` // Ajouter le token d'authentification dans les headers
      });
      return this.http.post<any>(`${this.apiURL}/reserve-and-pay`, data, { headers }).pipe(
        tap(response => {
          console.log('Réservation et paiement réussis', response);
        }),
        catchError(this.handleError)
      );
    }


//Récupérer la liste des véhicules disponibles
   getVehiculesAvaliable(ville: string, dateDebut: string, heureDebut: string, dateFin: string, heureFin: string): Observable<vehicule[]> {
    const dateHeureDebutISO = new Date(dateDebut + 'T' + heureDebut).toISOString().slice(0, -5) + 'Z';
    const dateHeureFinISO = new Date(dateFin + 'T' + heureFin).toISOString().slice(0, -5) + 'Z';

    // Utilisation de HttpParams est optionnelle ici, car vous construisez déjà la chaîne de requête manuellement
    const params = new HttpParams()
      .set('ville', ville)
      .set('dateDebut', dateHeureDebutISO)
      .set('dateFin', dateHeureFinISO);

    // Assurez-vous que `this.apiURL` est défini et pointe vers votre API
    return this.http.get<vehicule[]>(`${this.apiURL}/Vehicules/disponibilite/${ville}?dateDebut=${dateHeureDebutISO}&dateFin=${dateHeureFinISO}`)

    .pipe(
      map((response :vehicule[]) => response ),
      catchError(error => {
        console.log('error', error);
        return of([]); // Retourner un tableau vide en cas d'erreur
      })
    );
  }




    getVehiculeById(vehiculeid:string ): Observable<vehicule|undefined> {
      return this.http.get<vehicule>(`${this.apiURL}/vehicule/${vehiculeid}`).pipe(
        tap((response) => console.log(response)),
        catchError(error => {
          console.log('error',error);
          return of(undefined);
          })

            )}


    searchVehiculesList(make: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiURL}/Vehicules/search/${make}`);
    }



    updateVehicule(vehicule: vehicule): Observable<vehicule |undefined> {
      const httpOptions ={

        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
      return this.http.put<vehicule>(`${this.apiURL}/vehicules/${vehicule._id}`, vehicule, httpOptions).pipe(
        tap((response) => console.log(response)),
        catchError(error => {
          console.log('error',error);
          return of(undefined);
         })

         )}

//Récupérer le prix par jour d'un véhicule
    getPricePerDay(vehiculeid: string): Observable<number|undefined> {
      return this.http.get<number>(`${this.apiURL}/Vehicules/priceperday/${vehiculeid}`).pipe(

        tap(pricePerDay => console.log('vehicules',pricePerDay)),
        catchError(error => {
          console.log('error',error);
          return of(undefined);
         })

         )}

              private handleError(error: Error, errorValue: any) {
        console.error(error);
        return of(errorValue);
      }


      setChoosedVehicule(vehicule: vehicule) {

        this.vehicule = vehicule;



       }

      getChoosedVehicule(): vehicule  {
        if (this.vehicule) {
          return this.vehicule;
        }

        else {
         console.error('No vehicule selected');
          return {} as vehicule;
        }



}



}
