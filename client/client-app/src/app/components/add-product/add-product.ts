import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product'; // Correct path

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss'
})
export class AddProduct {
  product = {
    name: '',
    price: null,
    quantity: null,
    dateAdded: '',
    description: ''
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.isFormValid()) {
      this.productService.addProduct(this.product).subscribe({
        next: (response) => {
          console.log('Product added successfully:', response);
          alert('Product added successfully!');
          this.resetForm();
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error adding product:', error);
          alert('Error adding product. Please try again.');
        }
      });
    } else {
      alert('Please fill all required fields');
    }
  }

  private isFormValid(): boolean {
    return !!this.product.name && 
           this.product.price !== null && 
           this.product.quantity !== null && 
           !!this.product.dateAdded;
  }

  private resetForm() {
    this.product = {
      name: '',
      price: null,
      quantity: null,
      dateAdded: '',
      description: ''
    };
  }
}