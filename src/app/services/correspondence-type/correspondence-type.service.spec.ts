import { TestBed } from '@angular/core/testing';

import { CorrespondenceTypeService } from './correspondence-type.service';

describe('CorrespondenceTypeService', () => {
  let service: CorrespondenceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrespondenceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
