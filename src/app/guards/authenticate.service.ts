import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private http: HttpClient) {}

  // fetch user based on id
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  // check if user is admin
  isUserAdmin(id: number): Observable<boolean> {
    return this.http
      .get<User>(`${environment.apiUrl}/users/${id}`)
      .pipe(map(user => (user.role === 'admin' ? true : false)));
  }
}
