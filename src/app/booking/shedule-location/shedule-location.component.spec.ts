import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheduleLocationComponent } from './shedule-location.component';

describe('SheduleLocationComponent', () => {
  let component: SheduleLocationComponent;
  let fixture: ComponentFixture<SheduleLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheduleLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SheduleLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
