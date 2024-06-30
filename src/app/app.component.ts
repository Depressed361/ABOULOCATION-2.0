import { Component,OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ABOULOCATION-2.0';
  @ViewChild('burger', { static: false }) burger!: ElementRef;
  @ViewChild('navLinks', { static: false }) navLinks!: ElementRef;

  ngOnInit() {
    console.log('AppComponent initialized');
  }

  ngAfterViewInit() {
    this.burger.nativeElement.addEventListener('click', () => {
      this.navLinks.nativeElement.classList.toggle('mobile-menu');
    });
  }
}

