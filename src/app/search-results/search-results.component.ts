import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Question } from '../models/question.model';
import { ActivatedRoute } from "@angular/router";

import { QuickPanelComponent } from '../quick-panel/quick-panel.component';
import { QuestionService } from '../service/question.service';
import { LoaderService } from '../service/loader.service';
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit {
  questions$: Observable<Question[]>;
  term$: string;

  constructor(
    public route: ActivatedRoute,
    private questionService: QuestionService,
    private loaderService: LoaderService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe(
      (params) => {
        this.term$ = params['term'];
        this.loaderService.display(true);
        this.questions$ = this.questionService.questionsSearch(params['term']);
        this.questions$.subscribe({
          complete: () => {
            this.loaderService.display(false);
          }
        });
      }
    );
  };

  open(params: object) {
    const modalRef = this.modalService.open(QuickPanelComponent, { size: 'lg' });
    modalRef.componentInstance.authorId = params['authorId'];
    modalRef.componentInstance.tag = params['tag'];
  }
}