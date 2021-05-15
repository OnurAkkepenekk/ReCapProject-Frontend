import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { Car } from '../models/car';
import { CarDetail } from '../models/CarDTO';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'https://localhost:44369/api/';

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getall';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/GetByBrandId?brandId=' + brandId;
    console.log(newPath);
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/GetByColorId?colorId=' + colorId;
    console.log(newPath);
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsWithDetail(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getAllWithDetail';
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarWithDetail(carId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + 'cars/getCarWithDetail?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  add(car: Car) {
    return this.httpClient.post<SingleResponseModel<Car>>(
      this.apiUrl + 'cars/add',
      car
    );
  }
  update(car: Car) {
    return this.httpClient.post<SingleResponseModel<Car>>(
      this.apiUrl + 'cars/update',
      car
    );
  }
}
