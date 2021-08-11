export interface Rental {
  id:number;
  rentalId: number;
  carId: number;
  customerId: number;
  customerFirstAndLastName: string;
  rentDate: Date;
  returnDate: Date;
}
