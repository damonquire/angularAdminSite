import { TestBed } from '@angular/core/testing';

import { SolutionService } from './services/solution.service';

describe('SolutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolutionService = TestBed.get(SolutionService);
    expect(service).toBeTruthy();
  });
});
