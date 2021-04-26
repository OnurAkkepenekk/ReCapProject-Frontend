import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CreditCard } from 'src/app/models/creditCard';
import { ActivatedRoute } from '@angular/router';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/CarDTO';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  creditCard: CreditCard;
  creditCardForm: FormGroup;
  carId: number;
  car: CarDetail[];
  isCarRentable = false;
  totalPrice: number = 19;
  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private carDetailService: CarDetailService,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.createCreditCardForm();

    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
        this.getCarByCarId(this.carId);
        console.log(this.carId);
      }
    });
  }
  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      cardHolderName: ['', [Validators.required, Validators.maxLength(50)]],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ],
      ],
      expirationMonth: [
        '',
        [Validators.required, Validators.max(12), Validators.min(1)],
      ],
      expirationYear: [
        '',
        [Validators.required, Validators.max(99), Validators.min(0)],
      ],
      cvv: ['', [Validators.required, Validators.maxLength(3)]],
    });
  }
  getCarByCarId(carId: number) {
    this.carDetailService.getCarByCarId(carId).subscribe((response) => {
      this.car = response.data;
    });
  }
  calculateTotalPrice(totalDays: number, dailyPrice: number) {
    this.totalPrice = totalDays * dailyPrice;
    console.log(this.totalPrice);
    return this.totalPrice;
  }
  calculationDate() {
    let rentDate = this.creditCardForm.controls['rentDate'].value;
    let returnDate = this.creditCardForm.controls['returnDate'].value;
    let newRentDate = new Date(rentDate);
    let newReturnDate = new Date(returnDate);
    let result = Math.floor(
      (Date.UTC(
        newReturnDate.getFullYear(),
        newReturnDate.getMonth(),
        newReturnDate.getDate()
      ) -
        Date.UTC(
          newRentDate.getFullYear(),
          newRentDate.getMonth(),
          newRentDate.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
    return result;
  }
  checkCanRental() {
    let rentDate = this.creditCardForm.controls['rentDate'].value;
    let returnDate = this.creditCardForm.controls['returnDate'].value;

    if (rentDate && returnDate) {
      this.toastrService.info(
        'Seçilen tarihlerin uygunluğu kontrol ediliyor. Lütfen bekleyiniz...'
      );
      setTimeout(() => {
        this.rentalService
          .checkAvailability(rentDate, this.carId)
          .subscribe((response) => {
            console.log(response);
            if (!response.success)
              this.toastrService.error(
                'Araç başkası tarafından kiralanmıştır.'
              );
            else {
              this.toastrService.success('Araç kiralanabilir. ');
              this.isCarRentable = response.success;
            }
          });
      }, 3000);
    }
  }
  printTotalPrice() {
    return this.calculateTotalPrice(this.calculationDate(),this.car[0].dailyPrice);
  }
}