import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class NavbarEmmiterService {
  output = new Subject<any>();

  constructor() {}

  send(obj: User) {
    this.output.next(obj);
  }
}
