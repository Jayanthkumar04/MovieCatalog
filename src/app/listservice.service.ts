import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IList } from './menu/IList';
import { map } from 'rxjs';

interface OmdbResponse {
  Search: IList[];
  totalResults: string;
  Response: string;
}
@Injectable({
  providedIn: 'root',
})
export class ListserviceService {
  constructor(private http: HttpClient) {}

  getListBySearch(search: string, page: number) {
    return this.http
      .get<OmdbResponse>(
        `https://www.omdbapi.com/?apikey=10c22b1d&s=${search}`,
        {
          params: {
            page: page,
          },
        }
      )
      .pipe(
        map((response) => {
          const totalResults = parseInt(response.totalResults, 10);
          const totalPages = Math.ceil(totalResults / 10);
          return {
            movies: response.Search,
            totalPages: totalPages,
            totalResults: totalResults,
          };
        })
      );
  }

  searchByCategory(cat: string, search: string) {
    return this.http
      .get<OmdbResponse>(
        `https://www.omdbapi.com/?s=${search}&type=${cat}&apikey=10c22b1d`
      )
      .pipe(
        map((response) => {
          const totalResults = parseInt(response.totalResults, 10);
          return {
            movies: response.Search,
            totalResults: totalResults,
          };
        })
      );
  }
}
