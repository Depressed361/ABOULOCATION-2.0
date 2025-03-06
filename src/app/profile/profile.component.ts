import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../login/connexion/user';
import { ActivatedRoute } from '@angular/router';
import { AutService } from '../aut.service';
import { NgFor, NgIf } from '@angular/common';
import { Resa } from '../booking/location-form/resa';
import { SpinnerService } from '../spinner.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule,NgFor,MatProgressSpinner],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user!: User
  userId: string|any;
  resa! : Resa[

  ]
  isLoading = true;



  constructor(private router: Router,
    private route: ActivatedRoute,
    private autService: AutService,
    private spinnerService: SpinnerService
  ) {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
   }




  ngOnInit() {


    const userId = this.route.snapshot.paramMap.get('id');




    if (userId) {
      this.autService.getUserById(userId)
      .subscribe(user => this.user = user );

    }



}

simulateLoadingData() {
  this.spinnerService.showSpinner();
  setTimeout(() => {
    this.spinnerService.hideSpinner();
  }, 2000);
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
