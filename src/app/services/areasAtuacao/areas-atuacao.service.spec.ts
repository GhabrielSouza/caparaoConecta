import { TestBed } from '@angular/core/testing';

import { AreasAtuacaoService } from './areas-atuacao.service';

describe('AreasAtuacaoService', () => {
  let service: AreasAtuacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreasAtuacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
