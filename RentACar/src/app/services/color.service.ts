import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://localhost:44369/api/';
  constructor(private httpClient: HttpClient) {}
  getColors(): Observable<ListResponseModel<Color>> {
    return this.httpClient.get<ListResponseModel<Color>>(
      this.apiUrl + 'colors/getall'
    );
  }
  getColorById(id: number): Observable<SingleResponseModel<Color>> {
    let newPath = this.apiUrl + 'colors/getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }
  
  add(color: Color) {
    return this.httpClient.post<SingleResponseModel<Color>>(
      this.apiUrl + 'colors/add',
      color
    );
  }
  update(color: Color) {
    return this.httpClient.post<SingleResponseModel<Color>>(
      this.apiUrl + 'colors/update',
      color
    );
  }
}
