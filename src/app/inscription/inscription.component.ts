import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutService } from '../aut.service';
import { User } from '../connexion/user';


@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {
  user!: User;
  inscriptionForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private autService: AutService
  ) {}

  ngOnInit(): void {
    this.inscriptionForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Adresse: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8)]
    });

  }

  onSubmit():void {
    if (this.inscriptionForm.valid) {
      this.user = this.inscriptionForm.value;
      this.autService.inscription(this.user).subscribe({
        next: (response: any) => {
          if (response) {
            this.router.navigate(['connexion']);
          } else {
            console.log('error', response.message);
          }
        },
        error: (error: any) => {
          console.log('inscription error', error);
        }
      });

    }
  }

}
