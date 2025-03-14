import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { User } from '../models/User';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private http: HttpClient) {}

  // Error handle function, preferrably to be in a config file
  // https://v17.angular.io/guide/http-handle-request-errors
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  // this logic will be changed once Express is implemented, authentication will be based upon server (sesssion)
  // using a behaviorSubject is not necessary here, I used it to learn about it
  private userId = new BehaviorSubject<number | null>(
    this.getUserIdFromStorage()
  );
  userId$ = this.userId.asObservable();

  // retrieve from local storage, and convert to number
  private getUserIdFromStorage(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null;
  }
  // set the id in the local storage
  setUserId(id: number) {
    localStorage.setItem('userId', id.toString());
    this.userId.next(id);
  }
  // get the id
  getUserId(): number | null {
    return this.userId.value;
  }
  // clear the id, from local storage and the behavior subject
  clearUserId() {
    localStorage.removeItem('userId');
    this.userId.next(null);
  }

  // fetch user based on id
  // this also returns the password
  // !to be changed
  getUserById(id: number): Observable<User | null> {
    if (!id) {
      return of(null);
    }

    return this.http
      .get<User>(`${environment.apiUrl}/users/${id}`)
      .pipe(catchError(this.handleError));
  }

  // check if user is admin
  isUserAdmin(id: number | null): Observable<boolean> {
    if (!id) {
      return of(false);
    }

    return this.http.get<User>(`${environment.apiUrl}/users/${id}`).pipe(
      map(user => (user.role === 'admin' ? true : false)),
      catchError(this.handleError)
    );
  }

  // return the id of the logged in User
  // if null then user doesn't exist
  authenticateUser(
    username: string,
    password: string
  ): Observable<number | null> {
    if (!username || !password) {
      return of(null);
    }

    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      map(
        users =>
          users.find(
            user => user.username === username && user.password === password
          )?.id || null
      ),
      catchError(this.handleError)
    );
  }
}
