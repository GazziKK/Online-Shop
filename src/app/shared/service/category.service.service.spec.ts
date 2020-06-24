import { TestBed } from '@angular/core/testing';

import { Category.ServiceService } from './category.service.service';

describe('Category.ServiceService', () => {
  let service: Category.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Category.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
