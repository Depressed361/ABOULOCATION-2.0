import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutService } from '../aut.service';
import { User } from './user';




@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  Connexionform!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private autService: AutService
  ) { }

  ngOnInit(): void {
    this.Connexionform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  onSubmit(): void {
    const email = this.Connexionform.value.email;
    const password = this.Connexionform.value.password;



    console.log('email', email);
    console.log('password', password);

   if (email && password) {
    this.autService.login(email, password).subscribe({
      next: (response:any ) => {
        if (response && response.token) {
          this.router.navigate(['profile/',response.user._id]);
          
  
        } else {
          console.log('error', response.message);
        }
      },
      error: (error:any) => {
        console.log('connexion error', error);
      }

    });



}
}

}
