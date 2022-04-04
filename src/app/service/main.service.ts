import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Records } from '../Models/records.model';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http : HttpClient) { }

//Http get method
getData(): Observable<Records[]>{
  return this.http.get<Records[]>(environment.url)
  }
}
