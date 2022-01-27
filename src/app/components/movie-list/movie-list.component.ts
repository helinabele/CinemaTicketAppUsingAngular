import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { event } from 'jquery';
import * as moment from 'moment';
import { MovieListService } from 'src/app/components/movie-list/movie-list.service';
import { ICinema } from 'src/app/shared/model/cinema.model';
import { IMovie, Movie } from 'src/app/shared/model/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  form: FormGroup;
  date: any;
  movies: IMovie[] = [];
  public isCollapsed = false;
  readOnly = false;
  Movie_ID: number;
  title = 'Img';
  width = 400;
  height = 200;
  currentTime = 0;
  autoplay = false;
  preload = true;
  loop = false;
  quality = true;
  download = true;
  fullscreen = true;
  playsinline = false;
  showFrameByFrame = false;
  keyboard = true;
  spinner = 'spin';
  muted = false;
  cinemas: ICinema[];
  // gridColumns: any = new FormControl();
  gridColumns: number = 3;

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  videoClicked = false;
  constructor(
    private _movieListService: MovieListService,
    public datepipe: DatePipe,
    private _router: Router,
    private _route: ActivatedRoute,
    builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this._movieListService.getMovies().subscribe((result) => {
      this.movies = result;
    });
  }

  toggleVideo(event: any) {
    this.videoPlayer.nativeElement.play();
  }

  // toggleVideo(): void {
  //   this.videoClicked = true;
  //   console.log('im Play!');
  //   this.videoplayer.nativeElement.play();
  //   // this.videoPlayer.nativeElement.paused
  //   //   ? this.videoPlayer.nativeElement.play()
  //   //   : this.videoPlayer.nativeElement.pause();
  // }

  startVideo(): void {
    this.videoClicked = true;
    //this.videoPlayer.nativeElement.get().play();
  }

  myFunction() {
    this.date = new Date();
    let latest_date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  }

  getDateRange(StartDate: any, EndDate: any, DateFormat: any) {
    var dates = [],
      end = moment(EndDate),
      diff = EndDate.diff(StartDate, 'days');
    if (!StartDate.isValid() || !EndDate.isValid() || diff <= 0) {
      return;
    }
    for (var i = 0; i < diff; i++) {
      dates.push(end.subtract(1, 'd').format(DateFormat));
    }
    return dates;
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
}
