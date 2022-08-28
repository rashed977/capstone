import { TestBed } from '@angular/core/testing';

import { AdminnotloggedGuard } from './adminnotlogged.guard';

describe('AdminnotloggedGuard', () => {
  let guard: AdminnotloggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminnotloggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
