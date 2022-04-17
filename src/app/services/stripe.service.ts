import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private BASE_URL = "http://localhost:9090";

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    const url = `${this.BASE_URL}/api/v1/createUser`;
    return this.http.post(url, user);
  }
}
