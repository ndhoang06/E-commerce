import ProductEntity from "src/products/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Promotion {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    percent: number

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => ProductEntity, (product) => product.promotion)
    product: ProductEntity[]
}
