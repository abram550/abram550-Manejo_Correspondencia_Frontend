import { TestBed } from '@angular/core/testing';

import { EstadoCorrespondenciaService } from './estado-correspondencia.service';

describe('EstadoCorrespondenciaService', () => {
  let service: EstadoCorrespondenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoCorrespondenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
