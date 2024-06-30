import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ville } from './ville'
import { BookingService } from '../booking.service';
//import { VILLES } from './mock-ville';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-booking-ville',
  standalone: true,
  imports: [NgFor],
  templateUrl: './booking-ville.component.html',
  styleUrl: './booking-ville.component.css'
})
export class BookingVilleComponent implements OnInit{
  villes: ville[] | undefined;

; // Change the type to an array of ville objects
  constructor(private router: Router
    , private bookingService: BookingService
  ) { }

  ngOnInit(): void {

    this.bookingService.getVilles()
    .subscribe(villes => this.villes = villes);





  }

  gotoSheduleLocation(ville: ville) {
    this.router.navigate(['/shedule-location', ville.name]); // Navigate to the shedule-location route with the selected ville id


  }}



