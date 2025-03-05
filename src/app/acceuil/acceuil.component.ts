import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [ ],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit{

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {






}

goToBookingVille(){
  this.router.navigate(['/BookingVille']);
}


}
