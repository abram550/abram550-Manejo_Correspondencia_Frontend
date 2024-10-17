import { TestBed } from '@angular/core/testing';

import { TipoempleadoService } from './tipoempleado.service';

describe('TipoempleadoService', () => {
  let service: TipoempleadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoempleadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
