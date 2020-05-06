import { TestBed } from '@angular/core/testing';

import { RecentUseService } from './recent-use.service';

describe('RecentUseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecentUseService = TestBed.get(RecentUseService);
    expect(service).toBeTruthy();
  });
});