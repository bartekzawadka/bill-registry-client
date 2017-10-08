import { TestBed, inject } from '@angular/core/testing';

import { BillRegistryService } from './bill-registry.service';

describe('BillRegistryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillRegistryService]
    });
  });

  it('should be created', inject([BillRegistryService], (service: BillRegistryService) => {
    expect(service).toBeTruthy();
  }));
});
