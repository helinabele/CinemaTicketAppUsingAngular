import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICinema } from 'src/app/shared/model/cinema.model';
import {
  ColumnModel,
  ILayout,
  Layout,
  RowModel,
} from 'src/app/shared/model/layout.model';
import { IMovie, Movie } from 'src/app/shared/model/movie.model';
import { ReservationListModel } from 'src/app/shared/model/reservationList.model';
import { ReservationQueryModel } from 'src/app/shared/model/reservationQuery.model';
import { MovieListService } from '../movie-list/movie-list.service';
import { SitReservationService } from './sit-reservation.service';

@Component({
  selector: 'app-sit-reservation',
  templateUrl: './sit-reservation.component.html',
  styleUrls: ['./sit-reservation.component.scss'],
})
export class SitReservationComponent implements OnInit {
  layouts: ILayout[] = [];
  movie: IMovie = new Movie();
  movies: IMovie[] = [];
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
  seatData: any = {};
  clicked = false;
  constructor(
    private _sitReservationService: SitReservationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _movieListService: MovieListService
  ) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this.getMovie();
    this.structureForm();
  }

  mapReservationToLayout(reservation: ReservationListModel) {
    let rowC = this.lay.LayoutRow as number;
    let colC = this.lay.LayoutCol as number;
    this.lay.Rows = [];
    for (let r = 1; r <= rowC; r++) {
      let newRow = new RowModel();
      newRow.columns = [];
      for (let c = 1; c <= colC; c++) {
        let newCol = new ColumnModel();
        newCol.seatId = `${r.toString()}.${c.toString()}`;
        newRow.columns.push(newCol);
      }
      this.lay.Rows.push(newRow);
    }

    const temp = {
      seats: [reservation.Empty_Chair],
      seats2: [reservation.Reserved_Seats],
    };

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

    let temps2: any[] = [];
    temp.seats2.forEach((seat) => {
      const index = seat.indexOf('.');
      temps2.push(parseInt(seat.substring(0, index)));
    });

    for (const row in temps2) {
      let d = this.lay.Rows[temps2[row] - 1];
      d.columns.forEach((col) => {
        if (temp.seats2[0].split(',').includes(col.seatId)) {
          col.isReserved = true;
        }
        console.log('isReserved :', col.isReserved, col.seatId);
      });
    }
  }

  structureForm() {
    const params: ReservationQueryModel = {
      Movie_ID: this.id,
      Cinema_ID: 1,
      Schedule_Date: new Date('12-28-2021'),
      Schedule_ID: this.id,
      Schedule_Time: 4,
    };
    this._sitReservationService.getSeats(params).subscribe((data) => {
      console.log('DATA From Server', data);
      this.lay.LayoutCol = data[0].LayoutCol;
      this.lay.LayoutRow = data[0].LayoutRow;
      this.mapReservationToLayout(data ? data[0] : new ReservationListModel());
    });
  }

  selectSeat(col: ColumnModel) {
    const index = this.selectedSeats.findIndex(
      (seat) => seat.seatId == col.seatId
    );
    col.isSelected = !col.isSelected;
    if (col.isSelected) {
      this.selectedSeats.push(col);
    }
    if (index >= 0) {
      this.selectedSeats.splice(index, 1);
    }
    console.log(col.isSelected, col.seatId);
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
