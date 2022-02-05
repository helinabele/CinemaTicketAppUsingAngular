import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnModel, ILayout } from 'src/app/shared/model/layout.model';
import { IMovie } from 'src/app/shared/model/movie.model';
import { ReservationListModel } from 'src/app/shared/model/reservationList.model';
import { ReservationQueryModel } from 'src/app/shared/model/reservationQuery.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SitReservationService {
  private apiURL = environment.apiURL + '/CinimaTicket';
  public movies: IMovie[];
  public colModel: ColumnModel;
  constructor(private http: HttpClient) {}

  addSeat(seatData: any) {
    let seats = [];
    if (localStorage.getItem('Seats')) {
      seats = JSON.parse(localStorage.getItem('Seats')!);
      seats = [seatData, ...seats];
    } else {
      seats = [seatData];
    }
    localStorage.setItem('Seats', JSON.stringify(seats));
  }

  getSeats(query: ReservationQueryModel): Observable<ReservationListModel[]> {
    let params = new HttpParams();

    return this.http.post<ReservationListModel[]>(
      `${this.apiURL}/GetEmptyAndReserved`,
      query,
      {
        params,
      }
    );
  }

  get(id: string) {
    return this.http.get(`${this.apiURL}/GetEmptyAndReserved/${id}`);
  }

  save(layout: ILayout): Observable<ILayout> {
    let result: Observable<ILayout>;
    if (layout.Layout_ID) {
      result = this.http.put<ILayout>(
        `${this.apiURL}/GetEmptyAndReserved/${layout.Layout_ID}`,
        layout
      );
    } else {
      result = this.http.post<ILayout>(
        `${this.apiURL}/GetEmptyAndReserved`,
        layout
      );
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(
      `${this.apiURL}/GetEmptyAndReserved/${id.toString()}`
    );
  }
}
