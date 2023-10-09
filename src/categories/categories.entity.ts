import ProductEntity from 'src/products/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class CategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[]
}

export default CategoryEntity;
