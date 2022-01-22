import { ILayout } from './layout.model';
import { ISchedule } from './schedule.model';

export interface ITicket {
  Ticket_ID: number;
  Layout_ID: ILayout[];
  Schedule_ID: ISchedule[];
  QrCode: number;
  isUsed: number;
}

export class Ticket implements ITicket {
  constructor(
    public Ticket_ID: number,
    public QrCode: number,
    public isUsed: number,
    public Layout_ID: ILayout[],
    public Schedule_ID: ISchedule[]
  ) {}
}
