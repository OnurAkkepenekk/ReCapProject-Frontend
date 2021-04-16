import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44369/api/';

  constructor(private httpClient: HttpClient) {}
  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getall';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  getRentalsByCarId(id: number): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/GetById?id=' + id;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  rentCar(rental: Rental): Observable<ResponseModel> {
    let newpath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newpath, rental);
  }
  checkAvailability(rentDate: Date, carId: number) {
    let newpath =
      this.apiUrl +
      'rentals/checkavailability?rentDate=' +
      rentDate +
      '&carId=' +
      carId;
    return this.httpClient.get<ResponseModel>(newpath);
  }
}
