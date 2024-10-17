import { TestBed } from '@angular/core/testing';

import { EventosCorrespondenciaService } from './eventos-correspondencia.service';

describe('EventosCorrespondenciaService', () => {
  let service: EventosCorrespondenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosCorrespondenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
