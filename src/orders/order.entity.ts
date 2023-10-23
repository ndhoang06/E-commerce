import UserEntity from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export interface ShippingDetails {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: number;
}
export enum paymentMethod {
    BLOCKCHAIN = 'blockchain',
    CASH = 'cash',
    MOMO = 'momo',
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

    @Column('jsonb')
    orderItems: OrderItem[];

    @Column({ nullable: false, type: 'text' })
    shippingDetails: ShippingDetails

    @Column({ nullable: false })
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

    @Column({ type: "decimal",default:Date.now() })
    createdTimestamp: number;
}