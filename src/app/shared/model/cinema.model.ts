import { Moment } from 'moment';
import { ILayout } from './layout.model';
import { IMovie } from './movie.model';

export interface ICinema {
  Cinema_ID?: number;
  CinemaName?: String;
  Capacity?: number;
  LayoutID?: number;
  layouts?: ILayout[];
}

export class Cinema implements ICinema {
  constructor(
    public Cinema_ID?: number,
    public CinemaName?: String,
    public Capacity?: number,
    public LayoutId?: number,
    public layouts?: ILayout[]
  ) {}
}
