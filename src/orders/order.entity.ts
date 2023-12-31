import ProductEntity from "src/products/product.entity";
import UserEntity from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export interface ShippingDetails {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: number;
}
export enum paymentMethod {
    MOMO = 'momo',
    CASH = 'cash',
    VNPAY = 'vnpay',
}

export enum Status {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    PAYMENT = 'PAYMENT',
    SHIPPING = 'SHIPPING',
    DONE = 'DONE',
    CANCEL = 'CANCEL'
}

export interface OrderItem {
    name: string;
    qty: number;
    image: string;
    price: number;
    productId: string;
}
@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (users) => users.order)
    user: UserEntity

    @Column({ type: 'jsonb', nullable: true })
    orderItems: OrderItem[];

    @Column({ nullable: true, type: 'jsonb', })
    shippingDetails: ShippingDetails[]

    @Column({ nullable: false, default: paymentMethod.CASH })
    paymentMethod: paymentMethod;

    @Column({ nullable: false, default: 0.0 })
    taxPrice: number;

    @Column({ nullable: false, default: 0.0 })
    shippingPrice: number;

    @Column({ nullable: false, default: 0.0 })
    itemsPrice: number;

    @Column({ nullable: false, default: 0.0 })
    totalPrice: number;

    @Column({ default: false })
    isPaid: boolean;

    @Column({ nullable: true })
    paidAt: string;

    @Column({ default: false })
    isDelivered: boolean;

    @Column({ nullable: true })
    deliveredAt: string;

    @Column({ nullable: true })
    status: Status

    @Column({ type: "decimal", default: Date.now() })
    createdTimestamp: number;
}