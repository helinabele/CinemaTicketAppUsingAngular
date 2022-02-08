import { ICinema } from './cinema.model';

export interface IMovie {
  Movie_ID?: number;
  Movie_Title?: string;
  Movie_Discription?: string;
  Movie_Actor?: string;
  Movie_Trailer?: string;
  Movie_Poster?: string;
  Movie_Director?: string;
  cinemaId?: number;
  cinemas?: ICinema[];
  CinimaName?: string;
  Schedule_Time?: number;
  Schedule_ID?: number;
  Schedule_Date?: Date;
  Movie_Amount?: number;
}

export class Movie implements IMovie {
  constructor(
    public Movie_ID?: number,
    public Movie_Title?: string,
    public Movie_Discription?: string,
    public Movie_Actor?: string,
    public Movie_Trailer?: string,
    public Movie_Poster?: string,
    public Movie_Director?: string,
    public cinemaId?: number,
    public cinemas?: ICinema[],
    public CinimaName?: string,
    public Schedule_Time?: number,
    public Schedule_ID?: number,
    public Movie_Amount?: number,
    public Schedule_Date?: Date
  ) {
    this.Movie_ID = Movie_ID;
    this.Movie_Title = Movie_Title;
    this.Movie_Discription = Movie_Discription;
    this.Movie_Actor = Movie_Actor;
    this.Movie_Trailer = Movie_Trailer;
    this.Movie_Poster = Movie_Poster;
    this.Movie_Director = Movie_Director;
    this.CinimaName = CinimaName;
    this.Schedule_Time = Schedule_Time;
    this.Schedule_ID = Schedule_ID;
  }
}
