import { TestBed } from '@angular/core/testing';

import { DropdownService } from './services/dropdown.service';

describe('DropdownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DropdownService = TestBed.get(DropdownService);
    expect(service).toBeTruthy();
  });
});
