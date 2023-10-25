import { ApiPropertyOptional } from "@nestjs/swagger";
import { OrderItem, ShippingDetails, Status, paymentMethod } from "./order.entity";

export class OrderDTO {
    @ApiPropertyOptional()
    user: string

    @ApiPropertyOptional()
    orderItems: OrderItem[];

    @ApiPropertyOptional()
    shippingDetails: ShippingDetails

    @ApiPropertyOptional()
    paymentMethod: paymentMethod;

    @ApiPropertyOptional()
    taxPrice: number;

    @ApiPropertyOptional()
    shippingPrice: number;

    @ApiPropertyOptional()
    itemsPrice: number;

    @ApiPropertyOptional()
    totalPrice: number;

    @ApiPropertyOptional()
    isPaid: boolean;

    @ApiPropertyOptional()
    paidAt: string;

    @ApiPropertyOptional()
    isDelivered: boolean;

    @ApiPropertyOptional()
    deliveredAt: string;

    @ApiPropertyOptional()
    status: Status

}