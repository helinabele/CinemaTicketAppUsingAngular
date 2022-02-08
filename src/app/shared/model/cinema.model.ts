import { Moment } from 'moment';
import { ILayout } from './layout.model';
import { IMovie } from './movie.model';

export interface ICinema {
  Cinema_ID?: number;
  CinimaName?: String;
  Capacity?: number;
  LayoutID?: number;
  layouts?: ILayout[];
  Row?: number;
  Column?: number;
}

export class Cinema implements ICinema {
  constructor(
    public Cinema_ID?: number,
    public CinimaName?: String,
    public Capacity?: number,
    public LayoutId?: number,
    public layouts?: ILayout[],
    public Row?: number,
    public Column?: number
  ) {}
}
