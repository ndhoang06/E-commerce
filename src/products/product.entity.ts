import { Expose } from 'class-transformer';
import { AttachmentsEntity } from 'src/attachments/entities/attachment.entity';
import CategoryEntity from 'src/categories/categories.entity';
import { OrderEntity } from 'src/orders/order.entity';
import { Promotion } from 'src/promotion/entities/promotion.entity';
import TrademarkEntity from 'src/trademark/trademark.entity';
import UserEntity from 'src/users/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}
export enum TypeProduct {
    BANCHAY = 'bán chạy',
    KHUYENMAI = 'khuyến mãi',
    NEW = 'sản phẩm mới',
    KHONG = ''
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

    @ManyToOne(() => TrademarkEntity, (trademark) => trademark.products, { nullable: true })
    trademark: TrademarkEntity

    @Column({ nullable: true, default: null })
    image: string;

    @Column({ nullable: true, type: 'text', default: '' })
    description: string[];

    @Column('jsonb', { nullable: true })
    information: object;

    @OneToMany(() => Review, (review) => review.products)
    reviews: Review[];

    @Column('real', { nullable: false, default: 0 })
    rating: number;

    @Column({ nullable: false, default: 0 })
    numReviews: number;

    @Column({ nullable: true, default: 0, type: 'numeric' })
    price: number;

    @Column({ nullable: true, default: TypeProduct.NEW })
    type: TypeProduct;

    @Column({ nullable: false, default: 0 })
    countInStock: number;

    @Column({ nullable: false, default: new Date() })
    create_at: Date;

    @OneToMany(() => AttachmentsEntity, (attachment) => attachment.products, { cascade: true })
    attachments: AttachmentsEntity[]

    @ManyToOne(() => Promotion, (promotion) => promotion.product, { nullable: true })
    promotion: Promotion

}
@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => UserEntity, (user) => user.review)
    user: UserEntity

    @ManyToOne(() => ProductEntity, (products) => products.reviews , {onDelete: 'CASCADE'})
    products: ProductEntity

    @Column({ nullable: false })
    rating: number;

    @Column({ nullable: false })
    comment: string;
}

export class ProductShow {
    price: number;
    promotion: Promotion
    @Expose({ toPlainOnly: true })
    get unPrice(): number {
        return this.promotion ? this.price - (this.price * this.promotion.percent / 100) : this.price
    }
}

export default ProductEntity;
