import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IList } from '../menu/IList';
import { ListserviceService } from '../listservice.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MenuComponent } from '../menu/menu.component';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  list: IList[] = [];
  errorMessage: string = '';
  totalPages: number = 1;
  totalResults: number = 1;
  currentPage: number = 1;
  search: string = 'america';
  category: string = 'all';
  getListBySearch() {
    this.listService.getListBySearch(this.search, this.currentPage).subscribe({
      next: (data) => {
        console.log(data);
        this.list = data.movies;
        this.totalPages = data.totalPages;
        this.totalResults = data.totalResults;

        console.log('total results' + this.totalResults);
      },
    });
  }
  constructor(private listService: ListserviceService) {}
  ngOnInit(): void {
    this.getListBySearch();
  }

  currPage(n: number) {
    this.currentPage = n;
    if (this.category === 'all') {
      this.getListBySearch();
    } else {
      this.searchByCategory(this.category);
    }
    console.log(n);
  }

  searchItem(str: string) {
    this.search = str;
    this.getListBySearch();
  }

  searchByCategory(cat: string) {
    this.category = cat;
    if (cat === 'all') {
      this.getListBySearch();
      return;
    }
    this.listService
      .searchByCategory(cat, this.search, this.currentPage)
      .subscribe({
        next: (data) => {
          this.list = data.movies;
          this.totalResults = data.totalResults;
        },
      });
  }
}
