import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from "../service/question.service";
import {LoaderService} from "../service/loader.service";
import {Answer} from "../models/answer.model";
import {Observable} from "rxjs/internal/Observable";

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {
  questionId: number;
  qTitle: string;
  answers$: Observable<Answer[]>;

  constructor(
    public route: ActivatedRoute,
    private loaderService: LoaderService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.questionId = params['id'];
        this.loaderService.display(true);
        this.answers$ = this.questionService.getAnswersByQuestionId(params['id']);
        this.answers$.subscribe(
        data => {
            this.qTitle = data.length ? data[0].title : '';
            this.loaderService.display(false);
          })
      }
    );
  };
}