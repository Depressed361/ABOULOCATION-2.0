import { Component,OnDestroy,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ville } from '../booking-ville/ville';
import { BookingVilleComponent } from '../booking-ville/booking-ville.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription, subscribeOn } from 'rxjs';
import { group } from '@angular/animations';



@Component({
  selector: 'app-shedule-location',
  standalone: true,
  imports: [ReactiveFormsModule, BookingVilleComponent],
  templateUrl: './shedule-location.component.html',
  styleUrl: './shedule-location.component.css'
})
export class SheduleLocationComponent implements OnInit{
  sheduleLocationForm: FormGroup | any;
 ville: string| any;
 private routeSub: Subscription | undefined;

constructor(private router: Router, private route: ActivatedRoute,
  private formBuilder: FormBuilder
) {
  this.sheduleLocationForm  = this.formBuilder.group({
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required]
  }, {validator: this.dateRangeValidator});
 }




    ngOnInit(   ) {
      this.routeSub = this.route.paramMap.subscribe(params => {
        this.ville = params.get('ville');
      });
      this.sheduleLocationForm = new FormGroup({
        date: new FormControl(),
        heureDebut: new FormControl(),
        dateDebut: new FormControl(), // Ajout du contrôle 'startDate'
        dateFin: new FormControl(), // Ajout du contrôle 'endDate'
        heureFin: new FormControl()
      });
  }

  dateRangeValidator(control: FormControl) {
    const startDate = control.get('dateDebut')?.value;
    const endDate = control.get('dateFin')?.value;

    return startDate < endDate ? null : { dateRange: true };
  }

  onsubmit() {
    const ville = this.ville;
    const dateDebut = this.sheduleLocationForm.value.dateDebut;
    const heureDebut = this.sheduleLocationForm.value.heureDebut;
     const dateFin = this.sheduleLocationForm.value.dateFin;
    const heureFin = this.sheduleLocationForm.value.heureFin;

    if (ville && dateDebut && heureDebut && dateFin && heureFin) {
      // Utiliser un objet pour les paramètres de requête
      this.router.navigate(['/disponibilite', ville], { queryParams: { dateDebut: dateDebut, heureDebut,  dateFin: dateFin, heureFin } });
    }
  }

  ngOnDestroy() {
    // Nettoyer l'abonnement
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }




}
