import { AttachmentsEntity } from 'src/attachments/entities/attachment.entity';
import CategoryEntity from 'src/categories/categories.entity';
import TrademarkEntity from 'src/trademark/trademark.entity';
import UserEntity from 'src/users/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity()
class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false, unique: true })
    name: string;

    // @Column({ nullable: false })
    // brand: string;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    category: CategoryEntity

    @ManyToOne(() => TrademarkEntity, (trademark) => trademark.products)
    trademark: TrademarkEntity

    @Column({ nullable: true, default: null })
    image: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Review, (review) => review.products)
    reviews: Review[];

    @Column({ nullable: false, default: 0 })
    rating: number;

    @Column({ nullable: false, default: 0 })
    numReviews: number;

    @Column({ nullable: false, default: 0 })
    price: number;

    @Column({ nullable: false, default: 0 })
    countInStock: number;

    @OneToMany(() => AttachmentsEntity, (attachment) => attachment.products)
    attachments: AttachmentsEntity[]
}
@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => UserEntity, (user) => user.review)
    user: UserEntity

    @ManyToOne(() => ProductEntity, (products) => products.reviews)
    products: ProductEntity

    @Column({ nullable: false })
    rating: number;

    @Column({ nullable: false })
    comment: string;
}

export default ProductEntity;
