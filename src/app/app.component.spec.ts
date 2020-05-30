import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CatFactsService } from './services/cat-facts.service';
import { of, throwError } from 'rxjs';
import { CatFact } from './app.interfaces';

class CatFactsServiceStub{
  getRandomFact(){
    return of({})
  }
}
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers:[
        { provide: CatFactsService, useClass: CatFactsServiceStub },
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should call service'`, () => {
    const mockFacts: CatFact[]= [{ "used": false, "source": "user", "type": "cat", "deleted": false, "_id": "5d38b1d40f1c57001592f12c", "user": "5a9ac18c7478810ea6c06381", "text": "During the heat of the summer.", "createdAt": "2019-07-24T19:30:28.671Z", "updatedAt": "2020-05-10T20:20:11.457Z", "__v": 0, "status": { "verified": true, "sentCount": 1 } }, { "used": false, "source": "api", "type": "cat", "deleted": false, "_id": "591f97e88dec2e14e3c20b06", "__v": 0, "text": "A female Amur leopard gives birth to one to four cubs in each litter.", "updatedAt": "2020-05-10T20:20:11.457Z", "createdAt": "2018-05-16T20:20:03.145Z", "status": { "verified": true, "sentCount": 1 }, "user": "5a9ac18c7478810ea6c06381" }];
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    let  serviceStub = fixture.debugElement.injector.get(CatFactsService);
    const spy = spyOn(serviceStub, 'getRandomFact').and.returnValue(
      throwError('error')
    );
    app.ngOnInit();
    app.catFacts$.subscribe(data=> {
      console.log('success', data);
      fail('expected error');
    }, err => {
      console.log('fail', err)
      expect(err).toBeDefined()
    })
    expect(spy.calls.any()).toEqual(true);
  });
});
