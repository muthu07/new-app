import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { LoaderService } from '@services/loader/loader.service';

describe('LoaderService', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should set loading to true when show loader function is called', () => {
    service.show();
    expect(service.isLoading).toEqual(new Subject<true>());
  });

  it('Should set loading to false when hide loader function is called', () => {
    service.hide();
    expect(service.isLoading).toEqual(new Subject<false>());
  });
});
