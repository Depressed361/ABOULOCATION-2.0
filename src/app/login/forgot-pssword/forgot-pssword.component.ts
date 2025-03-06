import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutService } from '../../aut.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forgot-pssword',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './forgot-pssword.component.html',
  styleUrl: './forgot-pssword.component.css'
})
export class ForgotPsswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  successMessage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private autService: AutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      this.autService.forgotPassword({ email }).subscribe({
        next: (response) => {
          console.log('Email de réinitialisation envoyé', response);
          this.successMessage = 'Un email de réinitialisation a été envoyé à votre adresse email.';
          // Optionnel : Rediriger vers la page de connexion après un délai
          setTimeout(() => {
            this.router.navigate(['/connexion']);
          }, 3000);
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi de l\'email de réinitialisation', error);
        }
      });
    }
  }
}
