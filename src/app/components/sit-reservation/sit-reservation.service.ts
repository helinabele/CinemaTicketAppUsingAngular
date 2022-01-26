import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILayout } from 'src/app/shared/model/layout.model';
import { IMovie } from 'src/app/shared/model/movie.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SitReservationService {
  private apiURL = environment.apiURL + '/CinimaTicket';
  public movies: IMovie[];

  constructor(private http: HttpClient) {}

  getMovies(id: number): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.apiURL}/GetAllMovie/id`);
  }

  getDetail(id: number): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.apiURL}/GetAllMovie/id`);
  }

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

  getReservedSit() {
    return this.http.get<IMovie[]>(`${this.apiURL}`);
  }

  getSeats(): Observable<ILayout[]> {
    return this.http.get<ILayout[]>(`${this.apiURL}`);
  }
}
