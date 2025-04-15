import { TestBed } from '@angular/core/testing';

import { HabilidadesSService } from './habilidades-s.service';

describe('HabilidadesSService', () => {
  let service: HabilidadesSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabilidadesSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
