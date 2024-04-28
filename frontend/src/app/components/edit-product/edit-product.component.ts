import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  apiPending = false;
  apiError = false;

  productForm = this.formBuilder.group({
    id: new FormControl(0, { nonNullable: true }),
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
    category: new FormGroup({
      id: new FormControl(-1, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }),
    description: new FormControl(''),
  });

  originalProductName = '';

  categories: Category[] = [];

  ngOnInit() {
    const productId = parseInt(this.route.snapshot.paramMap.get('id') || '');
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.productService.getProduct(productId).subscribe((product) => {
      this.productForm.patchValue(product);
      this.originalProductName = product.name;
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.productForm.markAsUntouched();
    this.apiPending = true;

    this.productService
      .updateProduct(this.productForm.getRawValue())
      .subscribe({
        error: () => {
          this.apiPending = false;
          this.apiError = true;
        },
        complete: () => {
          this.apiError = false;
          this.apiPending = false;
          this.router.navigate(['/products']);
        },
      });
  }
}
