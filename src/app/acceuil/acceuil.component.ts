import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [ MatProgressSpinnerModule,NgIf ],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit{
isLoading = true;
  constructor(
    private router: Router
  ) {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
   }

  ngOnInit(): void {






}

goToBookingVille(){
  this.router.navigate(['/BookingVille']);
}


}
