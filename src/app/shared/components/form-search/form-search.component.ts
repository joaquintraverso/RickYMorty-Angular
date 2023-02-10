import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styles: ['input {width: 100%;}']
})

export class FormSearchComponent {

  constructor(private router: Router){}

  onSearch(value: string){
    if (value && value.length > 2) {
      this.router.navigate(['/characters-list'], {
        queryParams: {q: value}
      });
    }
  }
}
