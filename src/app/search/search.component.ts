import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  constructor(public router: Router) {}

  search(term: string): void {
    const query = term.trim();
    if (query.length) {
      this.router.navigate(['/results', {term: query}]);
    }
  }
}