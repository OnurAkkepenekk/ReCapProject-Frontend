import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'https://localhost:44369/api/CreditCards/';

  checkCreditCard(cardNumber: string): Observable<SingleResponseModel<CreditCard>> {
    let newUrl = this.apiUrl + 'GetCreditCardByCustomerId?customerId=' + cardNumber;
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newUrl);
  }

}
