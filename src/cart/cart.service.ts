import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartItem, ShippingDetails } from 'src/interfaces';
import { ProductDocument } from 'src/products/product.schema';
import { Cart } from './cart.schema';

interface AddCartItem {
  qty: number;
  productId?: string;
  product?: ProductDocument;
}

@Injectable()
export class CartService {
  cart = new Cart().cart;

  addCartItem({ qty, productId, product }: AddCartItem): CartItem {
    if (!productId && !product)
      throw new BadRequestException('No id or product provided.');
    if (product) {
      const { name, image, price, _id, countInStock } = product;
      const cartItem = {
        productId: productId,
        name,
        image,
        price,
        countInStock,
        qty:1,
      };
      const existingItemIndex = this.cart.cartItems.findIndex(
        x => x.productId === product.id
    );

    if (existingItemIndex !== -1) {
      this.cart.cartItems[existingItemIndex].qty += 1;
      return this.cart.cartItems[existingItemIndex];
  } else {
      this.cart.cartItems.push(cartItem);
      return cartItem;
  }
    } else {
      const cartItem = this.cart.cartItems.find(x => x.productId === productId);

      cartItem.qty = qty + 1;

      return cartItem;
    }
  }

  saveShippingDetails(shippingDetails: ShippingDetails): ShippingDetails {
    this.cart.shippingDetails = shippingDetails;

    return this.cart.shippingDetails;
  }

  savePaymentMethod(paymentMethod: string): string {
    this.cart.paymentMethod = paymentMethod;
    return this.cart.paymentMethod;
  }

  removeCart():CartItem[]  {
    return this.cart.cartItems = [];
  }

  removeCartItem(id: string): CartItem[] {
    const itemExists = this.cart.cartItems.find(x => x.productId === id);

    if (!itemExists) throw new NotFoundException('No cart item found.');

    return this.cart.cartItems.filter(x => x.productId !== id);
  }

  findAllItems(): CartItem[] {
    return this.cart.cartItems;
  }
}
