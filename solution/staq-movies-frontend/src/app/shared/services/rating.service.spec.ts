import { TestBed, inject } from '@angular/core/testing';

import { RatingService } from './rating.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RatingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RatingService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([RatingService], (service: RatingService) => {
    expect(service).toBeTruthy();
  }));
});
