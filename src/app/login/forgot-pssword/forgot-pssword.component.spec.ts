import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPsswordComponent } from './forgot-pssword.component';

describe('ForgotPsswordComponent', () => {
  let component: ForgotPsswordComponent;
  let fixture: ComponentFixture<ForgotPsswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPsswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgotPsswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
