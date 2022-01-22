import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/shared/model/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: IMovie[];
  constructor() {}

  ngOnInit(): void {}
}
