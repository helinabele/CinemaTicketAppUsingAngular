import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitReservationComponent } from './sit-reservation.component';

describe('SitReservationComponent', () => {
  let component: SitReservationComponent;
  let fixture: ComponentFixture<SitReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SitReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
