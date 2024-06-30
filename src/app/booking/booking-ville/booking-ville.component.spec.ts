import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingVilleComponent } from './booking-ville.component';

describe('BookingVilleComponent', () => {
  let component: BookingVilleComponent;
  let fixture: ComponentFixture<BookingVilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingVilleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
