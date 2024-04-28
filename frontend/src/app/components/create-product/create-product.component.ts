import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) {}

  apiPending = false;
  apiError = false;

  productForm = this.formBuilder.group({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    description: new FormControl(''),
  });

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.productForm.markAsUntouched();
    this.apiPending = true;

    this.productService
      .createProduct(this.productForm.getRawValue())
      .subscribe({
        error: () => {
          this.apiPending = false;
          this.apiError = true;
        },
        complete: () => {
          this.apiError = false;
          this.apiPending = false;
          this.productForm.reset();
        },
      });
  }
}
