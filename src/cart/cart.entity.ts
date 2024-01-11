import { CartItem, ShippingDetails } from 'src/interfaces';
import ProductEntity from 'src/products/product.entity';
import UserEntity from 'src/users/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class CartEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => UserEntity, (user) => user.cart)
    user: UserEntity
}

export default CartEntity;
