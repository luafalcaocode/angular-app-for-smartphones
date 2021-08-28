import { TestBed } from '@angular/core/testing';

import { RevealWindowService } from './reveal-window.service';

describe('RevealWindowService', () => {
  let service: RevealWindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevealWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
