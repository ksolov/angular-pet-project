import { Owner } from './owner.model';

export class Answer {
  owner: Owner;
  answer_id: number;
  title: string;
  body: string;
}