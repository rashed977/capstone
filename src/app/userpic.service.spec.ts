import { TestBed } from '@angular/core/testing';

import { UserpicService } from './userpic.service';

describe('UserpicService', () => {
  let service: UserpicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserpicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
