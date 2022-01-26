import { ICinema } from './cinema.model';

export interface ILayout {
  Layout_ID?: number;
  Cinema_ID?: ICinema[];
  Rows: RowModel[];
  isEmpty?: number[];
  LayoutRow?: number;
  LayoutCol?: number;
}

export class Layout implements ILayout {
  constructor(
    public Layout_ID?: number,
    public Cinema_ID?: ICinema[],
    public Rows: RowModel[] = [],
    public isEmpty?: number[],
    public LayoutRow?: number,
    public LayoutCol?: number
  ) {}
}

export class RowModel {
  public columns: ColumnModel[];
}

export class ColumnModel {
  public seatId: string;
  public seatType: string;
  public seatName: string;
  public isEmpty?: string;
  public isSelected?: boolean;
  public isUnavailable?: boolean;
  public isReserved?: boolean;
  public Row?: number;
  public LayoutCol?: number;
}
