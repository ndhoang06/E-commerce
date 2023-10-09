import CategoryEntity from 'src/categories/categories.entity';
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

    @Column({ nullable: false })
    brand: string;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    category: CategoryEntity

    @Column({ nullable: true, default: null })
    image: string;

    @Column({ nullable: true })
    description: string;

    // @Column({ nullable: false })
    // reviews: Review[];

    @Column({ nullable: false, default: 0 })
    rating: number;

    @Column({ nullable: false, default: 0 })
    numReviews: number;

    @Column({ nullable: false, default: 0 })
    price: number;

    @Column({ nullable: false, default: 0 })
    countInStock: number;
}

export default ProductEntity;
