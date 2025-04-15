import { TestBed } from '@angular/core/testing';

import { FormacoesAcademicasService } from './formacoes-academicas.service';

describe('FormacoesAcademicasService', () => {
  let service: FormacoesAcademicasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormacoesAcademicasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
