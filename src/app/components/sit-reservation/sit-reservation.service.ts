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
  selectedSeats: ColumnModel[] = [];
  private seatsForApi = 'SEATS_FOR_API';
  // myIds: Array<any> = [];
  // maxLen: number;

  constructor(private http: HttpClient) {}

  // setSeats(Schedule_ID: any) {
  //   this.selectedSeats = Schedule_ID;
  //   // if (this.maxLen < this.selectedSeats.length) {
  //   //   this.maxLen = this.selectedSeats.length;
  //   // }
  //   // console.log('Max :', this.maxLen);
  // }

  // retrieveIDs(Schedule_ID: any) {
  //   return this.selectedSeats;
  // }

  getSelectedSeats() {
    return JSON.parse(localStorage.getItem('Seats')!);
  }

  resetSelectedSeats() {
    localStorage.removeItem('Seats');
    localStorage.removeItem('SEATS_FOR_API');
  }

  addSeat(seatData: any) {
    this.resetSelectedSeats();
    if (seatData) {
      localStorage.setItem('Seats', JSON.stringify(seatData['0']));
      localStorage.setItem(
        'SEATS_FOR_API',
        seatData['0'].map((t: any) => t.seatId).join(',')
      );
    }
  }

  saveSeatForApi(seats: string) {
    localStorage.setItem(this.seatsForApi, seats);
  }

  getSeatsForApi() {
    return localStorage.getItem(this.seatsForApi);
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
  public getMovie(id: number) {
    return this.http.get(`${this.apiURL}/GetMovieDetail/${id}`);
  }
  remove(id: number) {
    return this.http.delete(
      `${this.apiURL}/GetEmptyAndReserved/${id.toString()}`
    );
  }
}
