import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

 constructor ( private router : Router) {}
  ngOnInit(): void {

  }






  goToconnexion(){
    this.router.navigate(['/connexion']);
  }

  goToinscrption(){
    this.router.navigate(['/inscription'])
  }
}
