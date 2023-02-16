import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

import { Observable } from 'rxjs';

// import { TrackHttpError } from '@@app/shared/models/trackHttpError';
import { CharacterService } from '@shared/services/character.service';
import { take } from 'rxjs/operators';
import { Character } from '@app/shared/interfaces/character.interfaces';


@Component({
  selector: 'app-characters-details',
  templateUrl: './characters-details.component.html',
  styleUrls: ['./characters-details.component.css']
})

export class CharactersDetailsComponent {
  characterId: Observable<Character>;

  constructor(private route:ActivatedRoute, private characterSvc:CharacterService, private location:Location) { }

  ngOnInit(): void {
    this.route.params.pipe( take(1)).subscribe((params) => {
      const id = params['id'];
      this.characterId = this.characterSvc.getDetails(id);
    });
  }

}