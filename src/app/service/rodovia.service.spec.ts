import { TestBed } from '@angular/core/testing';

import { RodoviaService } from './rodovia.service';

describe('FornecedorService', () => {
  let service: RodoviaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RodoviaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
