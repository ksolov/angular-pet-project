import { Owner } from './owner.model';

export class Question {
  tags: string[];
  owner: Owner;
  answer_count: number;
  question_id: number;
  link: string;
  title: string;
}