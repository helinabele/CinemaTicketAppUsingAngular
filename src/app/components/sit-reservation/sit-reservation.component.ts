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
    // for (const row in tempRows) {
    //   let removeable = this.lay.Rows[tempRows[row] - 1];
    //   removeable.columns = removeable.columns.filter(
    //     (el) => !temp.seats.includes(el.seatId)
    //   );
    // }
    for (const row in tempRows) {
      let removeable = this.lay.Rows[tempRows[row] - 1];
      removeable.columns.forEach((col) => {
        if (temp.seats.includes(col.seatId)) {
          col.isUnavailable = true;
        }
      });
    }
  }

  toggleColor(col: ColumnModel) {
    this.toggleStyle = !this.toggleStyle;
    this.status = this.toggleStyle ? 'Enable' : 'Disable';
    console.log('does it work?', col.seatId);
    col.isSelected = !col.isSelected;
  }

  // onClick($event: any) {
  //   const seat = $event.target.closest('.st121');
  //   if (!seat) {
  //     return;
  //   }
  //   const res = seat.getAttribute('class').split(' ').indexOf('occupied');
  //   if (res > -1) {
  //     seat.removeAttribute('style');
  //     seat.setAttribute('class', 'free st121');
  //     this.counter -= 1;
  //   } else if (this.counter < MAX_SEATS) {
  //     seat.removeAttribute('style');
  //     seat.setAttribute('class', 'occupied st121');
  //     this.counter += 1;
  //   }
  // }

  // rowNo(i: number) {
  //   return new Array(i);
  // }
  // rowNo(): Array<string> {
  //   const keys = Object.keys(EventType);
  //   return keys.slice(keys.length / 2);
  // }

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

  save() {}
  next() {}

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
