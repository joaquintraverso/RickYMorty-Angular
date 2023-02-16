import { NotExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Character } from '@app/shared/interfaces/character.interfaces';
import { CharacterService } from '@app/shared/services/character.service';
import { take, filter } from 'rxjs';

type RequestInfo = {
  next: string;
}

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})

export class CharactersListComponent {

  characters: Character[] = [];
  
  info: RequestInfo = {
    next: null,
  };

  private pageNum = 1;
  private query: string;

  constructor(
    private characterSvc: CharacterService,
    private route: ActivatedRoute,
    private router: Router
    ){
      this.urlChange();
    }

  ngOnInit(): void {
    // this.getData();
    this.getDataByName();
  }

  private urlChange(): void {
    this.router.events
    .pipe(filter(
      (event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters= [];
        this.pageNum = 1;
        this.getDataByName();
      })
  }

  private getDataByName() : void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      // console.log(params)
      this.query = params['q'];
      this.getData();
    });
  }

  private getData(): void{
    this.characterSvc
      .searchCharacters(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res?.results?.length){
          // console.log(res);
          const {info, results} = res;
          this.characters = [...this.characters, ...results];
          this.info = info;
        } else {
          this.characters = []
        }
      });
  }

}
