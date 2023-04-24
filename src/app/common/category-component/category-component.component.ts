import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoriesModel } from 'src/app/interfaces/categories-model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-component',
  templateUrl: './category-component.component.html',
  styleUrls: ['./category-component.component.scss'],
})
export class CategoryComponentComponent implements OnInit {
  @Input() categoryId!: string;
  @Input() userName!: string;
  @Input() userId!: string;

  sectionTitle?: string;
  categories: CategoriesModel = {
    currentCategoryId: '',
    error: null,
    items: [],
    loading: false,
    sub: new Subscription(),
    total: 0,
  };

  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.userName) {
      this.sectionTitle = this.userName + "'s";
    } else {
      this.sectionTitle = 'Blog';
    }

    if (!this.userId) {
      this.userId = 'all';
    }

    if (!this.categoryId) {
      this.categoryId = 'all';
    }

    this._route.params.subscribe((params: any) => {
      if (!params.categoryId) {
        this.categories.currentCategoryId = 'all';
      } else {
        this.categories.currentCategoryId = params.categoryId;
      }
    });

    this.getCategorizedBlogsCount();
  }

  getCategorizedBlogsCount() {
    this.categories.loading = true;
    this.categories.error = null;

    this.categories.sub = this._categoryService
      .getCategorizedBlogCount(this.userId, this.categoryId)
      .subscribe({
        next: (res: any) => {
          if (res[0] instanceof Observable) {
            let aux: any = [];
            res.map((r: any) => {
              r.subscribe((el: any) => {
                aux[el.id] = initializeArray(aux, el.id);
                aux[el.id],
                  (el = {
                    ...countSimilarElements(
                      aux,
                      el.id,
                      el,
                      this.categories.items
                    ),
                  });
              });
            });
          } else {
            this.categories.items = res;
            this.categories.items.map((category) => {
              this.categories.total += category.count;
            });
          }

          this.categories.loading = false;
          this.categories.sub.unsubscribe();
        },
        error: (err) => {
          this.categories.error = err;
          this.categories.loading = false;
          this.categories.sub.unsubscribe();
        },
      });

    function initializeArray(aux: any, id: number) {
      return !aux[id] ? (aux[id] = 0) : aux[id];
    }

    function countSimilarElements(
      aux: any,
      id: number,
      el: any,
      categories: any
    ) {
      if (!aux.includes(id)) {
        categories.push(el);
      } else {
        categories = categories.map((f: any) => {
          if (f.id === id) return (f.count += 1);
          return f;
        });
      }
      aux[id] += 1;
      el.count = aux[id];

      return { aux, el };
    }
  }
}
