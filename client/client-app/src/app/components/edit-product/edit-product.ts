import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product';

// Define Product interface manually
interface Product {
  _id?: string;
  name: string;
  price: number;
  quantity: number;
  dateAdded: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.scss' // Using the same SCSS as add-product
})
export class EditProduct implements OnInit {
  product: Product = {
    name: '',
    price: 0,
    quantity: 0,
    dateAdded: '',
    description: ''
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

loadProduct(): void {
  const productId = this.route.snapshot.paramMap.get('id');
  if (productId) {
    this.productService.getProducts().subscribe({
      next: (products: any[]) => {  // Add type annotation here
        const foundProduct = products.find((p: any) => p._id === productId);  // Add type to p
        if (foundProduct) {
          this.product = { ...foundProduct };
          // Convert date to YYYY-MM-DD format for the input
          if (this.product.dateAdded) {
            this.product.dateAdded = new Date(this.product.dateAdded).toISOString().split('T')[0];
          }
        } else {
          alert('Product not found');
          this.router.navigate(['/products']);
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        alert('Error loading product');
        this.router.navigate(['/products']);
      }
    });
  }
}

  onSubmit(): void {
    if (this.isFormValid()) {
      const productId = this.route.snapshot.paramMap.get('id');
      if (productId) {
        this.productService.updateProduct(productId, this.product).subscribe({
          next: (response) => {
            console.log('Product updated successfully:', response);
            alert('Product updated successfully!');
            this.router.navigate(['/products']);
          },
          error: (error) => {
            console.error('Error updating product:', error);
            alert('Error updating product. Please try again.');
          }
        });
      }
    } else {
      alert('Please fill all required fields');
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  private isFormValid(): boolean {
    return !!this.product.name && 
           this.product.price !== null && 
           this.product.price >= 0 &&
           this.product.quantity !== null && 
           this.product.quantity >= 0 &&
           !!this.product.dateAdded;
  }
}