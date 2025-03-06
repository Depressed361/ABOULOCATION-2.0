import { CanActivateFn,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AutService } from './aut.service';




export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
 if (inject(AutService).isLogged() && inject(AutService).isTokenValid()) {
   return true;

  }
  else
  {
    inject(Router).navigate(['/connexion']);
    return false;
  }
}



