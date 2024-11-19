import { TestBed } from '@angular/core/testing';

import { CorrespondenceStateService } from './correspondence-state.service';

describe('CorrespondenceStateService', () => {
  let service: CorrespondenceStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrespondenceStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
