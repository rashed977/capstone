import { TestBed } from '@angular/core/testing';

import { NgopicService } from './ngopic.service';

describe('NgopicService', () => {
  let service: NgopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
