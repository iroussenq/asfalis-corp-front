import { TestBed } from '@angular/core/testing';

import { AcidenteService } from './acidente.service';

describe('AcidenteService', () => {
  let service: AcidenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcidenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
