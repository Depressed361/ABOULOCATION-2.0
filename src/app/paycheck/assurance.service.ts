import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of,tap,catchError } from 'rxjs';
import { Assurance } from './assurance';
@Injectable({
  providedIn: 'root'
})
export class AssuranceService {
  assurancePremium!: boolean ;
  assuranceBasique!: boolean;
  assurance!: Assurance;

  private apiURL = 'http://localhost:5000/Assurances';

  constructor(private http:HttpClient) { }
   setAssurancePremium(value: boolean){
     this.assurancePremium = value;
   }
   setAssuranceBasique(value: boolean){
     this.assuranceBasique = value;
   }


   getAssurances(): Observable<Assurance[]|undefined> {
      return this.http.get<Assurance[]>(`${this.apiURL}/GetAssurance`).pipe(
        tap((response) => console.log(response)),
        catchError(error => {
          console.log('error',error);
          return of([]);
          })

        )}

   }

