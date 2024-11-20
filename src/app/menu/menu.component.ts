import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { ListComponent } from '../list/list.component';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ListComponent, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  page: number = 1;
  @Input()
  totalPages: number = 1;
  @Input()
  totalResults: number = 1;

  pageNo: number = 1;

  changePage(n: number) {
    if (this.page == 1 && n < 0) {
      return;
    }

    this.page += n;
  }

  @Output()
  currPage = new EventEmitter<number>();

  goTo(n: number) {
    console.log(n);
    this.pageNo = n;
    this.currPage.emit(n);
  }

  @Output()
  searchItem = new EventEmitter<string>();

  @Output()
  search = new EventEmitter<null>();

  @Output()
  searchCategory = new EventEmitter<string>();

  searchByCategory(s: string) {
    this.searchCategory.emit(s);
  }

  getListBySearch() {
    this.search.emit();
  }
  onSubmit(form: NgForm) {
    console.log(form.value.searchItem);
    this.searchItem.emit(form.value.searchItem);
  }
}
