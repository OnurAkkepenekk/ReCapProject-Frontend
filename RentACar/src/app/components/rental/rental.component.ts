import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  dataLoaded = false;
  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getRentals();
  }
  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      console.log(response);
      this.dataLoaded = true;
    });
  }
  getRentalDetails(carId:number){
    this.rentalService.getRentalsByCarId(carId).subscribe(response => {
      this.rentals = response.data;
    })
  }
  returnDateCheck(rental: Rental): string {
    let date: Date = new Date();
    if (rental.returnDate.toString() < date.toJSON().toString()) {
      return 'table-secondary'
    }
    return 'table-danger';
  }

}
