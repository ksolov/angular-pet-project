import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Results } from '../models/results.model';
import { Answer } from '../models/answer.model';
import { AnswerResults } from '../models/answerResults.model';
import { Question } from '../models/question.model';
import { config } from '../config/config';
import {Profile} from "../models/profile.model";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  questionsSearch(query: string): Observable<Question[]> {
    return this.http.get<Results>(`${config.api.url}search?order=${config.api.order}&sort=activity&site=${config.api.site}&intitle=${query}`).pipe(
      map( data => {
        return <Question[]>data.items;
      }),
      catchError(this.handleError('quesrionsSearch', []))
    );
  }

  getQuestionsByAuthor(authorId: number): Observable<Question[]> {
    return this.http.get<Results>(`${config.api.url}users/${authorId}/questions?order=${config.api.order}&sort=votes&pagesize=${config.api.pagesize}&site=${config.api.site}`).pipe(
      map( data => <Question[]>data.items),
      catchError(this.handleError('getQuestionsByAuthor', []))
    );
  }

  getAnswersByQuestionId(questionId: number): Observable<Answer[]> {
      return this.http.get<AnswerResults>(`${config.api.url}questions/${questionId}/answers?order=${config.api.order}&sort=activity&site=${config.api.site}&filter=!-*jbN.OXKfDP`).pipe(
          map(data => <Answer[]>data.items),
          catchError(this.handleError('getAnswersByQuestionId', []))
      )
  }

  getQuestionsByTag(tag: string): Observable<Question[]> {
    return this.http.get<Results>(`${config.api.url}questions?order=${config.api.order}&sort=votes&pagesize=${config.api.pagesize}&tagged=${tag}&site=${config.api.site}`).pipe(
        map( data => <Question[]>data.items),
        catchError(this.handleError('getQuestionsByTag', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(operation, error); // log to console instead

      return of(result as T);
    };
  }
}