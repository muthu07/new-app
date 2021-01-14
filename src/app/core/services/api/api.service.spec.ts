import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoaderService } from '@services/loader/loader.service';
import { noop } from '@core/utils/testHelpers';
import { ApiService } from '@services/api/api.service';

describe('ApiService', () => {
  let httpTestingController: HttpTestingController;
  let loaderService: LoaderService;
  let service: ApiService;

  class MockLoaderService {
    show = noop;
    hide = noop;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        {
          provide: LoaderService,
          useClass: MockLoaderService
        }
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    loaderService = TestBed.get<LoaderService>(LoaderService);
    service = TestBed.get(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  const mockGetResponse = {
    name: 'test',
    description: 'test'
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return observable with right data for get request', () => {
    service.get('test', 'getApi').subscribe(data => {
      expect(data.name).toMatch('test');
      expect(data.description).toMatch('test');
    });
    const req = httpTestingController.expectOne('test/getApi');
    expect(req.request.method).toEqual('GET');
    req.flush(mockGetResponse);
  });

  it('should call handleLoaderDisplay with increment and display loader value for get request', () => {
    spyOn(service, 'handleLoaderDisplay').and.callFake(noop);
    service.get('test', 'getApi', null, false).subscribe(data => {
      expect(data.name).toMatch('test');
      expect(data.description).toMatch('test');
      expect(service.handleLoaderDisplay).toHaveBeenCalledTimes(1);
      expect(service.handleLoaderDisplay).toHaveBeenCalledWith('INCREMENT', false);
    });
    const req = httpTestingController.expectOne('test/getApi');
    expect(req.request.method).toEqual('GET');
    req.flush(mockGetResponse);
  });

  it('should return observable with right data for put request', () => {
    service.put('test', 'putApi').subscribe(data => {
      expect(data.name).toMatch('test');
      expect(data.description).toMatch('test');
    });
    const req = httpTestingController.expectOne('test/putApi');
    expect(req.request.method).toEqual('PUT');
    req.flush(mockGetResponse);
  });

  it('should call handleLoaderDisplay with increment and display loader value for put request', () => {
    spyOn(service, 'handleLoaderDisplay').and.callFake(noop);
    // eslint-disable-next-line
    service.put("test", "putApi", null, null, false).subscribe(data => {
      expect(data.name).toMatch('test');
      expect(data.description).toMatch('test');
      expect(service.handleLoaderDisplay).toHaveBeenCalledTimes(1);
      expect(service.handleLoaderDisplay).toHaveBeenCalledWith('INCREMENT', false);
    });
    const req = httpTestingController.expectOne('test/putApi');
    expect(req.request.method).toEqual('PUT');
    req.flush(mockGetResponse);
  });

  it('should return observable with right data for post request', () => {
    service.post('test', 'postApi').subscribe(data => {
      expect(data.name).toMatch('test');
      expect(data.description).toMatch('test');
    });
    const req = httpTestingController.expectOne('test/postApi');
    expect(req.request.method).toEqual('POST');
    req.flush(mockGetResponse);
  });

  it('should call handleLoaderDisplay with increment and display loader value for post request', () => {
    spyOn(service, 'handleLoaderDisplay').and.callFake(noop);
    // eslint-disable-next-line
    service.post("test", "postApi", null, null, false).subscribe(data => {
      expect(data.name).toMatch('test');
      expect(data.description).toMatch('test');
      expect(service.handleLoaderDisplay).toHaveBeenCalledTimes(1);
      expect(service.handleLoaderDisplay).toHaveBeenCalledWith('INCREMENT', false);
    });
    const req = httpTestingController.expectOne('test/postApi');
    expect(req.request.method).toEqual('POST');
    req.flush(mockGetResponse);
  });

  it('should return observable with right data for patch request', () => {
    service.patch('test', 'patchApi').subscribe(data => {
      expect(data.name).toMatch('test');
      expect(data.description).toMatch('test');
    });
    const req = httpTestingController.expectOne('test/patchApi');
    expect(req.request.method).toEqual('PATCH');
    req.flush(mockGetResponse);
  });

  it('should call handleLoaderDisplay with increment and display loader value for patch request', () => {
    spyOn(service, 'handleLoaderDisplay').and.callFake(noop);
    // eslint-disable-next-line
    service.patch("test", "patchApi", null, null, false).subscribe(data => {
      expect(data.name).toMatch('test');
      expect(data.description).toMatch('test');
      expect(service.handleLoaderDisplay).toHaveBeenCalledTimes(1);
      expect(service.handleLoaderDisplay).toHaveBeenCalledWith('INCREMENT', false);
    });
    const req = httpTestingController.expectOne('test/patchApi');
    expect(req.request.method).toEqual('PATCH');
    req.flush(mockGetResponse);
  });

  it('should return observable with right data for delete request', () => {
    spyOn(service, 'handleLoaderDisplay').and.callFake(noop);
    service.delete('test', 'deleteApi').subscribe(data => {
      expect(data.name).toMatch('test');
      expect(data.description).toMatch('test');
    });
    const req = httpTestingController.expectOne('test/deleteApi');
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockGetResponse);
  });

  it('should call handleLoaderDisplay with increment and display loader value for delete request', () => {
    spyOn(service, 'handleLoaderDisplay').and.callFake(noop);
    // eslint-disable-next-line
    service.delete("test", "deleteApi", false).subscribe(data => {
      expect(data.name).toMatch('test');
      expect(data.description).toMatch('test');
      expect(service.handleLoaderDisplay).toHaveBeenCalledTimes(1);
      expect(service.handleLoaderDisplay).toHaveBeenCalledWith('INCREMENT', false);
    });
    const req = httpTestingController.expectOne('test/deleteApi');
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockGetResponse);
  });

  describe('Testing handleLoaderDisplay function', () => {
    describe('When displayLoader is true', () => {
      it('should call the loaderService show function when operation is increment and apiCallCount is 0', () => {
        const displayLoader = true;
        spyOn(loaderService, 'show').and.callFake(noop);
        service.handleLoaderDisplay('INCREMENT', displayLoader);
        expect(loaderService.show).toHaveBeenCalled();
      });
      it('should call the loaderService hide function when operation is decrement and apiCallCount is 1', () => {
        const displayLoader = true;
        spyOn(loaderService, 'hide').and.callFake(noop);
        service.handleLoaderDisplay('INCREMENT', displayLoader);
        service.handleLoaderDisplay('DECREMENT', displayLoader);
        expect(loaderService.hide).toHaveBeenCalled();
      });
    });
    describe('When displayLoader is false', () => {
      it('should not call the loaderService show function when operation is increment', () => {
        const displayLoader = false;
        spyOn(loaderService, 'show').and.callFake(noop);
        service.handleLoaderDisplay('INCREMENT', displayLoader);
        expect(loaderService.show).not.toHaveBeenCalled();
      });
      it('should not call the loaderService hide function when operation is decrement', () => {
        const displayLoader = false;
        spyOn(loaderService, 'hide').and.callFake(noop);
        service.handleLoaderDisplay('INCREMENT', displayLoader);
        service.handleLoaderDisplay('DECREMENT', displayLoader);
        expect(loaderService.hide).not.toHaveBeenCalled();
      });
    });
  });
});
