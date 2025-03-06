import { Component,OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AutService,  } from './aut.service';
import { NgIf } from '@angular/common';
import { User } from './login/connexion/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,
    NgIf,

    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent implements OnInit {



  userId!: string;
  showMenu :boolean=false;
  isLoggedIn! : boolean;
  menuHamburger!: Element;
  connexion!: boolean;
  constructor(private router: Router,private autService: AutService


  ) {

  }
  title = 'ABOULOCATION-2.0';
  @ViewChild('burger', { static: false }) burger!: ElementRef;
  @ViewChild('navLinks', { static: false }) navLinks!: ElementRef;

  ngOnInit() {


   /* this.isLoggedIn = this.autService.isLogged();*/


  this.userId = this.autService.userId

  this.isLoggedIn= this.autService.isLogged()

}







 /* ngAfterViewInit() {
    this.burger.nativeElement.addEventListener('click', () => {
      this.navLinks.nativeElement.classList.toggle('mobile-menu');
    });


  }*/
  goToBokingVille() {this.router.navigate (['/BookingVille']);}

  goToLogin() {this.router.navigate (['/connexion']);}
  goToInscription() {this.router.navigate (['/inscription']);}




toggleMenu() {

  this.showMenu = !this.showMenu;

}

goToProfile() {
this.autService.getUserById(this.userId)
.subscribe((user: User) => {
  console.log(user);
  this.router.navigate(['/profile', user._id]);
});

}

}
