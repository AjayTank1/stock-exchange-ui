import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

export interface PerDayData {
  date: Date,
  transactions: Transaction[]
}
export interface Transaction {
  symbol: string,
  num: number,
  rate: number,
  type: string,
}

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(
    private http: HttpClient,
  ) { }

  saveData(data: PerDayData): Observable<any> {
    return this.http.post("http://localhost:6060/data", data);  
  }

  getData(date:string): Observable<PerDayData> {
    return this.http.get<PerDayData>(`http://localhost:6060/data/${date}`);
  }

  getSymbol(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:6060/symbol');
  }

}
