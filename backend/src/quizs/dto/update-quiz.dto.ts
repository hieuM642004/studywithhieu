export class UpdateQuizDto {
  readonly question: string;
  readonly options: string[];
  readonly correctOptionIndex: number;
  readonly idTopic: string;
}
