import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnModel } from 'src/app/shared/model/layout.model';
import { IMovie, Movie } from 'src/app/shared/model/movie.model';
import { MovieListService } from '../movie-list/movie-list.service';
import { SitReservationComponent } from './sit-reservation.component';
import { SitReservationService } from './sit-reservation.service';

@Component({
  selector: 'app-sit-reservation-detail',
  templateUrl: './sit-reservation-detail.component.html',
  styleUrls: ['./sit-reservation.component-detail.scss'],
})
export class SitReservationDetailComponent implements OnInit {
  longText = `The Shiba`;
  movie: IMovie = new Movie();
  id: any;
  selectedSeats: ColumnModel[] = [];
  seatData: any = {};
  layoutId: string;

  constructor(
    private _movieListService: MovieListService,
    private _route: ActivatedRoute,
    private _sitReservationService: SitReservationService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getSeats();
    this.id = this._route.snapshot.paramMap.get('scheduleId');
    this.layoutId = this._route.snapshot.params['layoutId'];
    this.getMovie();
  }

  next() {}

  getSeats() {
    this.selectedSeats = this._sitReservationService.getSelectedSeats();
    console.log('Seats :', this.selectedSeats.length);
  }

  getMovie() {
    this._movieListService.getMovie(this.id).subscribe((data) => {
      this.movie = data;
    });
  }

  onSave(movie: any) {
    let seats = ``;
    this.selectedSeats.forEach((seat) => {
      seats += `${seat.seatId.toString()} `;
    });
    seats = seats
      .split(' ')
      .join(',')
      .substring(0, seats.length - 1);

    this._router.navigate([
      '/qr-code-generate',
      movie.Schedule_ID,
      this.layoutId,
    ]);
    this._sitReservationService.saveSeatForApi(seats);
    this.seatData = Object.assign(this.seatData, [
      this.selectedSeats,
      this.movie,
    ]);
    this._sitReservationService.addSeat(this.seatData);
  }

  previousState() {
    window.history.back();
  }
}
