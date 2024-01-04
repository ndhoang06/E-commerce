import { CartItem, ShippingDetails } from 'src/interfaces';
import { paymentMethod } from 'src/orders/order.entity';

export interface CartInterface {
  cartItems: CartItem[];
  shippingDetails: ShippingDetails;
  paymentMethod: string;
}

export const defaultCart = {
  cartItems: [],
  shippingDetails: {
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: 0
  },
  paymentMethod: paymentMethod.CASH,
};

export class Cart {
  constructor(public cart: CartInterface = defaultCart) { }
}
