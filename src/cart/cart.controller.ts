import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Session,
} from '@nestjs/common';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { SaveShippingDetailsDto } from './dtos/save-shipping-details.dto';
import { CartService } from './cart.service';
import { defaultCart } from './cart.schema';
import { SavePaymentMethodDto } from './dtos/save-payment-method.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private cartService: CartService) { }

  @Post()
  addToCart(@Body() body: AddToCartDto, @Session() session: any) {
    this.cartService.cart = session.cart ? session.cart : defaultCart;
    const cartItem = this.cartService.addCartItem({ ...body });
    session.cart = this.cartService.cart;
    return cartItem;
  }

  @Post('shipping')
  saveShipping(@Body() body: SaveShippingDetailsDto, @Session() session: any) {
    this.cartService.cart = session.cart ? session.cart : defaultCart;

    const shippingDetails = this.cartService.saveShippingDetails(body);

    session.cart = this.cartService.cart;

    return shippingDetails;
  }

  @Get()
  getCart(@Session() session: any) {
    return session.cart ? session.cart : defaultCart;
  }

  @Post('payment')
  savePaymentMethod(
    @Body() { paymentMethod }: SavePaymentMethodDto,
    @Session() session: any
  ) {
    this.cartService.cart = session.cart ? session.cart : defaultCart;

    const shippingDetails = this.cartService.savePaymentMethod(paymentMethod);

    session.cart = this.cartService.cart;

    return shippingDetails;
  }

  @Delete()
  removeCart(@Session() session:any){
    this.cartService.cart = session.cart ? session.cart : defaultCart;

    const cartItems = this.cartService.removeCart();

    session.cart.cartItems = cartItems;
    return cartItems
  }

  @Delete(':id')
  removeCartItem(@Param('id') id: string, @Session() session: any) {
    this.cartService.cart = session.cart ? session.cart : defaultCart;

    const cartItems = this.cartService.removeCartItem(id);

    session.cart.cartItems = cartItems;

    return cartItems;
  }
}
