import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { buildPath } from '../helpers/path.helper';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient, private _errorService: ErrorService) {}

  getCategoryList() {
    return this._http
      .get(`${environment.apiUrl}/category`)
      .pipe(catchError((err) => this._errorService.handleError(err)));
  }

  getCategorizedBlogCount(userId: string, categoryId: string) {
    return userId == 'all' && categoryId == 'all'
      ? this.getCategoryList()
      : this.getAll({
          'writter.userId': userId,
          'category.categoryId': categoryId,
        });
  }

  getCategory(id: string) {
    return this._http
      .get(`${environment.apiUrl}/category/${id}`)
      .pipe(catchError((err) => this._errorService.handleError(err)));
  }

  @buildPath getAll(path: {}) {
    return this._http.get(`${environment.apiUrl}/blog/${path}`).pipe(
      map((res: any) => {
        return res.map((blog: any) => {
          return this.getCategory(blog.category.categoryId);
        });
      }),
      catchError((err) => this._errorService.handleError(err))
    );
  }
}
