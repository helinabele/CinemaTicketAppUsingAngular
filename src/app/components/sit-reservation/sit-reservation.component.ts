import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie, Movie } from 'src/app/shared/model/movie.model';
import { SitReservationService } from './sit-reservation.service';
import { MovieListService } from '../movie-list/movie-list.service';
import {
  ColumnModel,
  ILayout,
  Layout,
  RowModel,
} from 'src/app/shared/model/layout.model';
import { ICinema } from 'src/app/shared/model/cinema.model';

@Component({
  selector: 'app-sit-reservation',
  templateUrl: './sit-reservation.component.html',
  styleUrls: ['./sit-reservation.component.scss'],
})
export class SitReservationComponent implements OnInit {
  layouts: ILayout[] = [];
  movie: IMovie = new Movie();
  readOnly = false;
  isSaving: boolean;
  Movie_ID: string | null;
  id: any;
  lay: ILayout = new Layout();
  cinemas: ICinema[];
  counter = 0;
  toggleStyle = false;
  isEmpty: boolean = false;
  bookings = [];
  selectedSeats: ColumnModel[] = [];
  moviePrice = 160;
  seatData: any = {};
  clicked = false;

  constructor(
    private _sitReservationService: SitReservationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _movieListService: MovieListService
  ) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('Movie_ID');
    this.getMovie();
    this.structureForm();
    this.loadSeats();
  }

  structureForm() {
    let row = 10;
    let column = 8;
    this.lay.Rows = [];
    for (let r = 1; r <= row; r++) {
      let newRow = new RowModel();
      newRow.columns = [];
      for (let c = 1; c <= column; c++) {
        let newCol = new ColumnModel();
        newCol.seatId = `${r.toString()}.${c.toString()}`;
        newRow.columns.push(newCol);
      }
      this.lay.Rows.push(newRow);
    }

    const temp = { seats: ['1.4', '6.3', '7.3', '8.3', '9.3', '10.3', '2.6'] };
    const temp2 = { seats2: ['3.1', '10.4', '5.4', '6.4', '3.3'] };

    let tempRows: any[] = [];
    temp.seats.forEach((seat) => {
      const index = seat.indexOf('.');
      tempRows.push(parseInt(seat.substring(0, index)));
    });

    for (const row in tempRows) {
      let removeable = this.lay.Rows[tempRows[row] - 1];
      removeable.columns.forEach((col) => {
        if (temp.seats.includes(col.seatId)) {
          col.isUnavailable = true;
        }
      });
    }
    for (const row in tempRows) {
      let d = this.lay.Rows[tempRows[row] - 1];
      d.columns.forEach((col) => {
        if (temp2.seats2.includes(col.seatId)) {
          col.isReserved = true;
        }
      });
    }
  }

  selectSeat(col: ColumnModel) {
    console.log(col.isSelected);
    console.log(col.isReserved);
    console.log(col.isUnavailable);
    const index = this.selectedSeats.findIndex(
      (seat) => seat.seatId == col.seatId
    );
    col.isSelected = !col.isSelected;
    if (col.isSelected) {
      this.selectedSeats.push(col);
    } else {
      index && this.selectedSeats.splice(index, 1);
    }
  }

  loadSeats() {
    this._sitReservationService.getSeats().subscribe((result) => {
      this.layouts = result;
    });
  }

  getMovie() {
    this._movieListService.getMovie(this.id).subscribe((data) => {
      this.movie = data;
    });
  }

  previousState() {
    window.history.back();
  }

  confirmSeat() {
    this.seatData = Object.assign(this.seatData, [
      this.selectedSeats,
      this.movie,
    ]);
    this._sitReservationService.addSeat(this.seatData);
  }

  private onSaveSuccess(result: IMovie) {
    this.isSaving = false;
    this.previousState();
  }

  onSaveError() {
    this.isSaving = false;
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }
}
