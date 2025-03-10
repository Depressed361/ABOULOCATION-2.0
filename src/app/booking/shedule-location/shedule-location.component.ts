import { Component,importProvidersFrom,OnDestroy,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators,FormControl, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingVilleComponent } from '../booking-ville/booking-ville.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription,  } from 'rxjs';
import { LoctationService } from '../../loctation.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-shedule-location',
  standalone: true,
  imports: [ReactiveFormsModule, ],
  templateUrl: './shedule-location.component.html',
  styleUrl: './shedule-location.component.css'
})
export class SheduleLocationComponent implements OnInit{

  sheduleLocationForm!: FormGroup ;
 ville: string| any;
 private routeSub: Subscription | undefined;
 minDate: string | any;
 minTime: string | any;
 minDateFin: string | any;
  minTimeFin: string | any;

 formSubmitted: boolean = false;

constructor(private router: Router,
  private route: ActivatedRoute,
  private formBuilder: FormBuilder,
  private loctationService: LoctationService,

) { const today = new Date();
  this.minDate = today.toISOString().split('T')[0] //on fromate pour envoyez la date au format yyyy-mm-dd attendu par le navigateur
  this.minTime = today.toISOString().split('T')[1].split('.')[0]
  this.minDateFin = today.toISOString().split('T')[0]
  this.minTimeFin = today.toISOString().split('T')[1].split('.')[0]

 }



    ngOnInit(   ) {

      this.routeSub = this.route.paramMap.subscribe(params => {
        this.ville = params.get('ville');
      });
      this.sheduleLocationForm = new FormGroup({ //initialisation du formulaire qui est un objet de type FormGroup
        dateDebut: new FormControl('', [Validators.required, this.dateRangeValidator]),
        heureDebut: new FormControl('', [Validators.required, this.dateRangeValidator]),
        dateFin: new FormControl('', [Validators.required, this.dateRangeValidator]),
        heureFin: new FormControl('', [Validators.required, this.dateRangeValidator]),
      }, { validators: this.dateRangeValidator });

    }

    dateRangeValidator(control: AbstractControl) {
      const dateDebut = control.get('dateDebut')?.value;
      const heureDebut = control.get('heureDebut')?.value;
      const dateFin = control.get('dateFin')?.value;
      const heureFin = control.get('heureFin')?.value;

      if (dateDebut && heureDebut && dateFin && heureFin) {
        if (dateDebut > dateFin) {
          return { dateRange: true };
        }
        if (dateDebut === dateFin && heureDebut > heureFin) {
          return { dateRange: true };
        }
      }

      return null;

    }






  onsubmit() {

    this.formSubmitted= true;
    const ville = this.ville;
    const dateDebut = this.sheduleLocationForm.value.dateDebut;
    const heureDebut = this.sheduleLocationForm.value.heureDebut;
     const dateFin = this.sheduleLocationForm.value.dateFin;
    const heureFin = this.sheduleLocationForm.value.heureFin;

    if (ville && dateDebut && heureDebut && dateFin && heureFin && this.sheduleLocationForm.valid) {
      // Utiliser un objet pour les paramètres de requête
      this.router.navigate(['/disponibilite', ville], { queryParams: { dateDebut: dateDebut, heureDebut,  dateFin: dateFin, heureFin } });
      this.loctationService.setDateDebut(dateDebut);
      this.loctationService.setDateFin(dateFin);

    }

    else {
      alert('Veuillez remplir tous les champs du formulaire.');
    }

  }

 /* ngOnDestroy() {
    // Nettoyer l'abonnement
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }*/






}



