import { TestBed, inject } from '@angular/core/testing';

import { NetworkCallsService } from './network-calls.service';

describe('NetworkCallsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkCallsService]
    });
  });

  it('should be created', inject([NetworkCallsService], (service: NetworkCallsService) => {
    expect(service).toBeTruthy();
  }));
});
