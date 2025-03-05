import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router,  } from '@angular/router';
import { Observable,throwError } from 'rxjs';
import { tap , catchError,  } from 'rxjs/operators';
import { User } from './connexion/user';
import { Resa } from './booking/location-form/resa';
import { of } from 'rxjs';
import { useAnimation } from '@angular/animations';


@Injectable({
  providedIn: 'root'
})
export class AutService {

  private apiURL = 'http://localhost:5000/user';
  userId!: string;
  Utilisateur!: User;
  token!: string;


    constructor(
      private http: HttpClient,
      private router: Router
    ) { }

    inscription (user: User): Observable<User> {
      return this.http.post<any>(`${this.apiURL}/signup/`, user).pipe(
        tap(response => {
          if (response) {
            console.log('inscription', response);
          } else {
            console.log('error', response.message);
          }
        }),
        catchError(this.handleError)
      );
    }

    login(email: string, password: string): Observable<{ user: User, token: string }> {
      return this.http.post<{ user: User, token: string }>(`${this.apiURL}/login/`, { email, password }).pipe(
        tap(response => {
          if (response.user && response.token) {
            localStorage.setItem('token', response.token);
            this.token= response.token
            this.userId = response.user._id;
            localStorage.setItem('userId', this.userId);
            console.log('login', response);
          }
    }
        ),
        catchError(this.handleError)
      );
    }





    isLogged(): boolean {
      return !!localStorage.getItem('token');

    }
    private handleError(error: HttpErrorResponse): Observable<never> {
      if (error.error instanceof ErrorEvent) {
        // Erreur côté client ou réseau
        console.error('An error occurred:', error.error.message);
      } else {
        // Erreur retournée par le backend
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error.message}`);
      }
      // Retourne une observable avec un message d'erreur lisible pour l'utilisateur
      return throwError('Something bad happened; please try again later.');
    }




    logout() {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }

    getUserById(userId: string): Observable<User> {
      const localStorageToken = localStorage.getItem('token') || '';
      userId = localStorage.getItem('userId') || '';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${localStorageToken}` // Ajouter le token d'authentification dans les headers
      });
      return this.http.get<User>(`${this.apiURL}/${userId}`, { headers }).pipe(
        tap(response => console.log(response)),
        catchError(this.handleError)
      );
    }

    getReservation(userId:string|null):Observable <Resa[]> {
      const localStorageToken = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ` ${localStorageToken}` // Ajouter le token d'authentification dans les headers)}`
      });
      return this.http.get<Resa[]>(`${this.apiURL}/Getreservations/${userId}`,{headers}).pipe(
        tap((response) => console.log(response)),
        catchError(error => {
          console.log('error',error);
          return of([]);
        })
      );




    }

    }



