import { Build } from 'src/build-pc/entities/build.entity';
import CartEntity from 'src/cart/cart.entity';
import { OrderEntity } from 'src/orders/order.entity';
import { Review } from 'src/products/product.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity()
class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    // @Column()
    // googleId?: string;

    @Column({nullable:true})
    firstName: string;

    @Column({nullable:true})
    lastName: string;

    @Column()
    picture: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false, default: UserRole.USER })
    role: UserRole;

    @OneToMany(() => OrderEntity, (order) => order.user)
    order: OrderEntity[]

    @OneToMany(() => Review, (review) => review.user)
    review: Review[]

    @OneToOne(() => Build, (build) => build.user)
    build: Build;

    @OneToMany(() => CartEntity, (cart) => cart.user)
    cart: CartEntity[]

    @Column({ type: "decimal", default: Date.now() })
    createdTimestamp: number;
}

export default UserEntity;
