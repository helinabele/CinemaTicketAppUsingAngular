import { TestBed } from '@angular/core/testing';

import { SitReservationService } from './sit-reservation.service';

describe('SitReservationService', () => {
  let service: SitReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
