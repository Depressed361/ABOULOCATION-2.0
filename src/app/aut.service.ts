import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router,  } from '@angular/router';
import { Observable,throwError } from 'rxjs';
import { tap , catchError,  } from 'rxjs/operators';
import { User } from './login/connexion/user';
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
      return this.http.post<any>(`${this.apiURL}/inscription/`,user ).pipe(
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




 // savoir si un utilisateur est connecté
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

    isTokenValid(): boolean {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }

      // Par exemple, vérifier l'expiration du token
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const expiry = tokenPayload.exp;
      const now = Math.floor(Date.now() / 1000);
      return now < expiry;
    }

    forgotPassword(data: { email: string }): Observable<any> {//envoyer un email de réinitialisation de mot de passe
      return this.http.post<any>(`${this.apiURL}/forgot-password`, data).pipe(
        tap(response => {
          console.log('Email de réinitialisation envoyé', response);
        }),
        catchError(this.handleError)
      );
    }


    logout() {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }

    getUserById(userId: string): Observable<User> {//afficher les informations d'un utilisateur
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

    getReservation(userId:string|null):Observable <Resa[]> {//afficher les reservations d'un utilisateur
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






    getUserId(): string {
      return localStorage.getItem('userId') || '';
    }


  }

