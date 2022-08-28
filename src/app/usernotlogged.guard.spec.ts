import { TestBed } from '@angular/core/testing';

import { UsernotloggedGuard } from './usernotlogged.guard';

describe('UsernotloggedGuard', () => {
  let guard: UsernotloggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsernotloggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
