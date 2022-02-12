import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/shared/model/movie.model';
import { ReservationListModel } from 'src/app/shared/model/reservationList.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QrCodeGenerateService {
  constructor(private http: HttpClient) {}
  private apiURL = environment.apiURL + '/CinimaTicket';

  getlayout(seatData: ReservationListModel): Observable<string> {
    return this.http.post<string>(`${this.apiURL}/InsertLayout`, seatData);
  }

  getSchedule(): Observable<IMovie[]> {
    console.log('getSchedule ' + this.apiURL + 'movie');
    return this.http.get<IMovie[]>(this.apiURL + 'movie');
  }

  get(id: string) {
    return this.http.get(`${this.apiURL}/InsertLayout/${id}`);
  }
  addSchedule(movie: IMovie): Observable<any> {
    const body = JSON.stringify(movie);
    console.log(body);
    return this.http.post(this.apiURL + 'movie', body);
  }

  // addHero(Movie_ID: number): Observable<IMovie[]> {
  //   return this.http.post<IMovie[]>(`${this.apiURL}/InsertLayout/${Movie_ID}`,body,{'headers':headers});
  // }
}
