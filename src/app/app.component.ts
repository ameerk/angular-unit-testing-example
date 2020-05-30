import { Component, OnInit } from '@angular/core';
import { CatFactsService } from './services/cat-facts.service';
import { Observable } from 'rxjs';
import { CatFact } from './app.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'testing-example';
  catFacts$: Observable<CatFact[]>;
  constructor(private catFactsService: CatFactsService){
  }

  ngOnInit(){
    this.catFacts$ = this.catFactsService.getRandomFact();
  }

}
