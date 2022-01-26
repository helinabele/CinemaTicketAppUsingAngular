import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IMovie } from 'src/app/shared/model/movie.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  constructor(private http: HttpClient) {}

  private apiURL = environment.apiURL + '/CinimaTicket';

  public getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.apiURL}/GetAllMovie`);
  }

  public getMovie(id: number) {
    //const movie: IMovie[]=this.getMovies();
    // return movie.find(m => m.Movie_ID===id);
    return this.http.get(`${this.apiURL}/GetMovieDetail/${id}`);
  }

  updateSit(Movie_ID: number): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.apiURL}/GetAllMovie/${Movie_ID}`);
  }

  insertMovies(movie: IMovie) {
    return this.http.post<any>(this.apiURL, movie);
  }
}
