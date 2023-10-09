import { CartItem, ShippingDetails } from 'src/interfaces';

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
  paymentMethod: 'Cash',
};

export class Cart {
  constructor(public cart: CartInterface = defaultCart) { }
}
