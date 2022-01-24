import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie, Movie } from 'src/app/shared/model/movie.model';
import { SitReservationService } from './sit-reservation.service';
import { MovieListService } from '../movie-list/movie-list.service';
import { data, param } from 'jquery';
import { ISchedule } from 'src/app/shared/model/schedule.model';
import {
  ColumnModel,
  ILayout,
  Layout,
  RowModel,
} from 'src/app/shared/model/layout.model';
import { ICinema } from 'src/app/shared/model/cinema.model';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
const MAX_SEATS = 9;

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
  isReserved: boolean;
  lay: ILayout = new Layout();
  cinemas: ICinema[];
  counter = 0;
  toggleStyle = false;
  status = 'Enable';
  // coll: ColumnModel = {
  //   seatId: '1',
  //  // seatName: 'r',
  //   //seatType: 't',
  // };
  //isEmpty: ['0.4', '1.4', '2.4', '3.4'];
  isEmpty: boolean = false;
  bookings = [];
  selectedSeats: ColumnModel[] = [];
  moviePrice = 160;
  seatC: any = {};

  constructor(
    private _sitReservationService: SitReservationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _movieListService: MovieListService
  ) {}
  ngOnInit() {
    // this.viewSits();
    this.id = this._route.snapshot.paramMap.get('Movie_ID');
    this.getOne();
    this.structureForm();
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
  }

  selectSeat(col: ColumnModel) {
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

  // viewSits() {
  //   this._sitReservationService.updateSit().subscribe((result) => {
  //     this.layouts = result;
  //   });
  // }

  getOne() {
    this._movieListService.getMovie(this.id).subscribe((data) => {
      this.movie = data;
    });
  }

  previousState() {
    window.history.back();
  }

  confirmSeat() {
    console.log(this.selectedSeats);
    this.seatC = Object.assign(this.seatC, this.selectedSeats);
    this._sitReservationService.addSeat(this.seatC);
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
