import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brands: Brand[] = [];
  brandAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toasterService: ToastrService
  ) {}

  createAddBrandForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.createAddBrandForm();
  }
  add() {
    let brandModel = Object.assign({}, this.brandAddForm.value);

    if (this.brandAddForm.valid) {
      this.brandService.addBrand(brandModel).subscribe(
        (response) => {
          if (response.success) {
            this.toasterService.success('Brand added successfully', 'Success');
          }
        },
        (responseError) => {
          console.log(responseError);
          if (responseError.error.Errors.length > 0) {
            console.log(responseError.error.Errors);
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toasterService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toasterService.error('Form Invalid', 'Error');
    }
  }
}
