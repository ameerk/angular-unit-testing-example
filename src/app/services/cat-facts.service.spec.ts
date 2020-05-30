import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CatFactsService } from './cat-facts.service';
import { CatFact } from '../app.interfaces';
import { of } from 'rxjs';

describe('CatFactsService', () => {
  let injector: TestBed;
  let service: CatFactsService;
  let httpMock: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CatFactsService]
  }));
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    injector = getTestBed();
    service = injector.get(CatFactsService);
    httpMock = injector.get(HttpTestingController);
    expect(service).toBeTruthy();
  });

  it('should receive date ', () => {
    injector = getTestBed();
    service = injector.get(CatFactsService);
    httpMock = injector.get(HttpTestingController);
    const mockFacts: CatFact[]= [{ "used": false, "source": "user", "type": "cat", "deleted": false, "_id": "5d38b1d40f1c57001592f12c", "user": "5a9ac18c7478810ea6c06381", "text": "During the heat of the summer, set out an extra bowl of water and place ice cubes in it to keep it cold and refreshing. Cats love to lie on cool surfaces when it's hot—if you don't have an tile in your home, consider buying a few ceramic tiles from a home improvement store for your cat to rest on.", "createdAt": "2019-07-24T19:30:28.671Z", "updatedAt": "2020-05-10T20:20:11.457Z", "__v": 0, "status": { "verified": true, "sentCount": 1 } }, { "used": false, "source": "api", "type": "cat", "deleted": false, "_id": "591f97e88dec2e14e3c20b06", "__v": 0, "text": "A female Amur leopard gives birth to one to four cubs in each litter.", "updatedAt": "2020-05-10T20:20:11.457Z", "createdAt": "2018-05-16T20:20:03.145Z", "status": { "verified": true, "sentCount": 1 }, "user": "5a9ac18c7478810ea6c06381" }];

    service.getRandomFact().subscribe(facts => {
      expect(facts.length).toBe(2);
      expect(facts).toEqual(mockFacts);
    });
    const req = httpMock.expectOne(`${service.baseUrl}/facts/random?animal_type=cat&amount=2`);
    expect(req.request.method).toBe("GET");
    req.flush(mockFacts);
  });

  it('should handle error ', () => {
    injector = getTestBed();
    service = injector.get(CatFactsService);
    httpMock = injector.get(HttpTestingController);
    const mockError = {error:'bad ass'}
    service.getRandomFact().subscribe( data =>{
      fail('expected error');
    }, err=>{
        expect(err).toBeDefined();
        expect(err.error).toBe(mockError);
    });
    
    const req = httpMock.expectOne(`${service.baseUrl}/facts/random?animal_type=cat&amount=2`);
    expect(req.request.method).toBe("GET");
    req.flush(mockError,{ status: 400, statusText: 'Bad Request' });
  });
});
