import { TestBed } from '@angular/core/testing';

import { CursosSService } from './cursos-s.service';

describe('CursosSService', () => {
  let service: CursosSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
