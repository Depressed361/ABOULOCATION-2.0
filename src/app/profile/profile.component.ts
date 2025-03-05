import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../connexion/user';
import { ActivatedRoute } from '@angular/router';
import { AutService } from '../aut.service';
import { NgFor, NgIf } from '@angular/common';
import { Resa } from '../booking/location-form/resa';
import { VehiculeService } from '../booking/choose-car/vehicule.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule,NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user!: User
  userId: string|any;
  resa! : Resa[

  ];



  constructor(private router: Router,
    private route: ActivatedRoute,
    private autService: AutService,

  ) {}

  ngOnInit() {

    const userId = this.route.snapshot.paramMap.get('id');




    if (userId) {
      this.autService.getUserById(userId)
      .subscribe(user => this.user = user );

    }



}



getReservations() {

  this.autService.getReservation(this.userId= this.route.snapshot.paramMap.get('id'))
  .subscribe(resa => this.resa = resa);
}

logout() {
  this.autService.logout();
  this.router.navigate(['/connexion']);

}




}
