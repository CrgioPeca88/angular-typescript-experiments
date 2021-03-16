// Dependencies
import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, pipe, of} from 'rxjs';
import {switchMap, map} from 'rxjs/operators';

export interface Movie {
  Title: string;
  Year: number;
  imdbID: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Movie[];
}

@Component({
  selector: 'exercise4-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  public moviesList: Movie[];
  public year: number;

  constructor(private http: HttpClient) {
    this.moviesList = null;
    this.year = null;
  }

  ngOnInit() {}

  private getMoviesFromAPI(year: number): Observable<Movie[]> {
    return this.http.get<ApiResponse>(`https://jsonmock.hackerrank.com/api/movies?Year=${year}`).pipe(
      map(apiResponse => apiResponse.data)
    )
  }

  public searchMovies(): void {
    of(null).pipe(
      switchMap(empty => this.getMoviesFromAPI(this.year))
    ).subscribe(response => {
      this.moviesList = response
    });
  }

}
