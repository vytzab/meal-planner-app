import { TestBed } from '@angular/core/testing';

import { WeekplanService } from './weekplan.service';

describe('WeekplanService', () => {
  let service: WeekplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeekplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
