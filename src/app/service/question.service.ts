import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Results } from '../models/results.model';
import { Answer } from '../models/answer.model';
import { AnswerResults } from '../models/answerResults.model';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private pagesize = 5;
  private site = 'stackoverflow';
  private order = 'desc';
  private searchUrl = 'https://api.stackexchange.com/2.2/';  // URL to web api

  constructor(private http: HttpClient) { }

  questionsSearch(query: string): Observable<Question[]> {
    return this.http.get<Results>(`${this.searchUrl}search?order=${this.order}&sort=activity&site=${this.site}&intitle=${query}`).pipe(
      map( data => <Question[]>data.items),
      catchError(this.handleError('quesrionsSearch', []))
    );

  }

  getQuestionsByAuthor(authorId: number): Observable<Question[]> {
    return this.http.get<Results>(`${this.searchUrl}users/${authorId}/questions?order=${this.order}&sort=votes&pagesize=${this.pagesize}&site=${this.site}`).pipe(
      map( data => <Question[]>data.items),
      catchError(this.handleError('getQuestionsByAuthor', []))
    );
  }

  getAnswersByQuestionId(questionId: number): Observable<Answer[]> {
      return this.http.get<AnswerResults>(`${this.searchUrl}questions/${questionId}/answers?order=${this.order}&sort=activity&site=${this.site}&filter=!-*jbN.OXKfDP`).pipe(
          map(data => <Answer[]>data.items),
          catchError(this.handleError('getAnswersByQuestionId', []))
      )
  }

  getQuestionsByTag(tag: string): Observable<Question[]> {
    return this.http.get<Results>(`${this.searchUrl}questions?order=${this.order}&sort=votes&pagesize=${this.pagesize}&tagged=${tag}&site=${this.site}`).pipe(
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