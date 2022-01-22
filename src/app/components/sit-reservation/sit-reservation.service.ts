import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILayout } from 'src/app/shared/model/layout.model';
import { IMovie } from 'src/app/shared/model/movie.model';

@Injectable({
  providedIn: 'root',
})
export class SitReservationService {
  apiURL = 'http://localhost:61717/api/CinimaTicket';
  public movies: IMovie[];

  constructor(private http: HttpClient) {}

  updateSit() {
    return this.http.get<ILayout[]>(`${this.apiURL}/GetEmptyAndReserved`);
  }

  getMovies(id: number): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.apiURL}/GetAllMovie/id`);
  }

  getDetail(id: number): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.apiURL}/GetAllMovie/id`);
  }
}
