import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../core/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<{data:IUser[]}> {
    const url = environment.API_SOCKETS;
    return this.httpClient.get<{data:IUser[]}>(url)
  }

}
