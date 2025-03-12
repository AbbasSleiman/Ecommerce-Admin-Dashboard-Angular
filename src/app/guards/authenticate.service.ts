import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private http: HttpClient) {}

  // fetch the role, and check if the user is an Admin
  isAdmin(id: number): Observable<boolean> {
    return this.http
      .get<any>(`http://localhost:3000/users?id=${id}`)
      .pipe(map(users => (users.role === 'admin' ? true : false)));
  }
}
