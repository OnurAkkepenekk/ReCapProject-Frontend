import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm: FormGroup;
  brand: Brand;
  constructor(
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createUpdateBrandFrom();
    this.activatedRoute.params.subscribe((parameter) => {
      if (parameter['brandId']) {
        this.getBrandByBrandId(parameter['brandId']);
      }
    });
  }
  createUpdateBrandFrom() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [Validators.required],
      brandName: ['', Validators.required],
    });
  }
  getBrandByBrandId(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brand = response.data;
      console.log(this.brand);
      this.brandUpdateForm.setValue({
        brandId: response.data.brandId,
        brandName: response.data.brandName,
      });
    });
  }
  update(){
    let carModel = Object.assign({}, this.brandUpdateForm.value);
    if (this.brandUpdateForm.valid) {
      this.brandService.update(carModel).subscribe(
        (response) => {
          if (response.success) {
            this.toasterService.success('brand updated successfully');
          }
        },
        (responseError) => {
          console.log(responseError);
          if (responseError.error.Errors.length > 0) {
            console.log(responseError.error.Errors);
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toasterService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası");
            }
          }
        }
      );
    } else {
      this.toasterService.error('Not add car!!!!', 'Error');
    }
  }
}
