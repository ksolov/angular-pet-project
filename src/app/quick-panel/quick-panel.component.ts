import { Component, OnChanges, OnInit, SimpleChanges, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionService } from '../service/question.service';
import { Question } from '../models/question.model';
import {Observable} from "rxjs/internal/Observable";

@Component({
    selector: 'app-quick-panel',
    templateUrl: './quick-panel.component.html'
})
export class QuickPanelComponent implements OnInit {
  @Input() authorId: number;
  @Input() tag: string;
  @Input() authorName: string;
  isLoading: boolean = false;
  authorQuestions$: Observable<Question[]>;

  constructor(public activeModal: NgbActiveModal, private questionService: QuestionService) {}

  ngOnInit(){
    this.isLoading = true;
    if (this.authorId) {
      this.authorQuestions$ = this.questionService.getQuestionsByAuthor(this.authorId);
    } else if (this.tag) {
      this.authorQuestions$ = this.questionService.getQuestionsByTag(this.tag);
    }

    this.authorQuestions$.subscribe({
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}