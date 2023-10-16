import ProductEntity from 'src/products/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class TrademarkEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => ProductEntity, (product) => product.trademark)
    products: ProductEntity[];

    @Column({ nullable: true, default: '' })
    image: string

    @Column({ nullable: false })
    name: string
}

export default TrademarkEntity;
