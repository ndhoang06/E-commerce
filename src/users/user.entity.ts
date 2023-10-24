import { OrderEntity } from 'src/orders/order.entity';
import { Review } from 'src/products/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column()
    firstName: string;

    @Column()
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
}

export default UserEntity;
