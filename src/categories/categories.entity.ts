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

    @Column({ nullable:true ,default:'' })
    url: string

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'createdAt',
    })
    created_at: Date
}

export default CategoryEntity;
