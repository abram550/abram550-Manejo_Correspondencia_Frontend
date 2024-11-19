import { TestBed } from '@angular/core/testing';

import { CorrespondenceEventsService } from './events-correspondence.service';

describe('CorrespondenceEventsService', () => {
  let service: CorrespondenceEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrespondenceEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
