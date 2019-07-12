import { TestBed, inject } from '@angular/core/testing';

import { ApiFactoryService } from './api-factory.service';

describe('ApiFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiFactoryService]
    });
  });

  it('should be created', inject([ApiFactoryService], (service: ApiFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
