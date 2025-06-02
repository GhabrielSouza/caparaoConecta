import { TestBed } from '@angular/core/testing';

import { InstituicoesService } from './instituicoes.service';

describe('InstituicoesService', () => {
  let service: InstituicoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituicoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
