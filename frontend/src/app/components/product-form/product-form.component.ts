import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  @Input() product?: Product;
  @Input() apiPending = false;
  @Input() apiError = false;
  @Input() submitButtonText = 'Submit';
  @Output() onSubmitEvent = new EventEmitter<Omit<Product, 'id'>>();

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
  ) {}

  categories: Category[] = [];

  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

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
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(999_999_99),
      ],
    }),
    category: new FormGroup({
      id: new FormControl(-1, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
    }),
    description: new FormControl('', {
      validators: [Validators.maxLength(500)],
    }),
  });

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.onSubmitEvent.emit(this.productForm.getRawValue());
  }

  reset() {
    this.productForm.reset();
  }
}
