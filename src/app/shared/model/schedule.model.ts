import { Moment } from 'moment';
import { ILayout } from './layout.model';
import { IMovie } from './movie.model';

export interface ISchedule {
  Schedule_ID: number;
  Movie_Amount: number;
  CinimaName: number;
  Schedule_Date: number;
  Schedule_Time: number;
  Cinema_ID: number;
  movieInfo: IMovie[];
  Movie_ID: number;
  layout: ILayout[];
}

export class Schedule implements ISchedule {
  constructor(
    public Schedule_ID: number,
    public Movie_Amount: number,
    public CinimaName: number,
    public Schedule_Date: number,
    public Schedule_Time: number,
    public Cinema_ID: number,
    public movieInfo: IMovie[],
    public Movie_ID: number,
    public layout: ILayout[]
  ) {}
}
