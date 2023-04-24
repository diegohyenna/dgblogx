import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';
import { buildPath } from '../helpers/path.helper';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  bloggerId!: string;
  categoryId!: string;

  constructor(private _http: HttpClient, private _errorService: ErrorService) {}

  writeBlog(data: any) {
    return this._http
      .post(`${environment.apiUrl}/blog`, data)
      .pipe(catchError((err) => this._errorService.handleError(err)));
  }

  postComment(data: any) {
    let blogId = data.blogId;

    data = {
      comments: [
        {
          userId: data.user.id || 0,
          first_name: data.user.first_name || 'Anonimo',
          last_name: data.user.last_name || '',
          time: new Date().toISOString(),
          body: data.body,
        },
      ],
    };

    return this._http
      .patch(`${environment.apiUrl}/blog/${blogId}`, data)
      .pipe(catchError((err) => this._errorService.handleError(err)));
  }

  postReact(data: any) {
    return this._http
      .put(`${environment.apiUrl}/blog/react`, data)
      .pipe(catchError((err) => this._errorService.handleError(err)));
  }

  getBlogList(userId: string, categoryId: string, page = 1) {
    return this.getAll({
      'writter.userId': userId,
      'category.categoryId': categoryId,
      page,
    });
  }

  @buildPath getAll(path: any) {
    return this._http
      .get(`${environment.apiUrl}/blog/${path}`)
      .pipe(catchError((err) => this._errorService.handleError(err)));
  }

  getBlogDetails(blogId: string) {
    return this._http
      .get(`${environment.apiUrl}/blog/${blogId}`)
      .pipe(catchError((err) => this._errorService.handleError(err)));
  }
}
