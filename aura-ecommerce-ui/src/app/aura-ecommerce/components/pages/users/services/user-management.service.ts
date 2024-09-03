import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuraUser } from '../models/aura-user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseGenericResult } from 'src/app/shared/models/response-generic-result/response-generic-result.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private baseUrl = environment.apiUrl +'/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<AuraUser[]> {
    return this.http.get<AuraUser[]>(this.baseUrl);
  }

  createUser(user: AuraUser): Observable<ResponseGenericResult<boolean>> {
    return this.http.post<ResponseGenericResult<boolean>>(this.baseUrl, user);
  }

  updateUser(user: AuraUser): Observable<ResponseGenericResult<boolean>> {
    return this.http.put<ResponseGenericResult<boolean>>(`${this.baseUrl}`, user);
  }

  deleteUser(id: number): Observable<ResponseGenericResult<boolean>> {
    return this.http.delete<ResponseGenericResult<boolean>>(`${this.baseUrl}/${id}`);
  }}
