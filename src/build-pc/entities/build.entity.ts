import UserEntity from 'src/users/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Build {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: true,type:"uuid" })
    cpu: string

    @Column({ nullable: true,type:"uuid" })
    mainboard: string

    @Column({ nullable: true,type:"uuid" })
    ram: string

    @Column({ nullable: true,type:"uuid" })
    hdd: string

    @Column({ nullable: true,type:"uuid" })
    ssd: string

    @Column({ nullable: true,type:"uuid" })
    vga: string

    @Column({ nullable: true,type:"uuid" })
    psu: string

    @Column({ nullable: true,type:"uuid" })
    case: string

    @Column({ nullable: true,type:"uuid" })
    monitor: string

    @Column({ nullable: true,type:"uuid" })
    keyboard: string

    @Column({ nullable: true,type:"uuid" })
    mouse: string

    @Column({ nullable: true,type:"uuid" })
    led: string

    @Column({ nullable: true,type:"uuid" })
    radiators: string
    
    @Column({ default: 1 })
    qtycpu: number

    @Column({ default: 1 })
    qtymainboard: number

    @Column({ default: 1 })
    qtyram: number

    @Column({ default: 1 })
    qtyhdd: number

    @Column({ default: 1 })
    qtyssd: number

    @Column({ default: 1 })
    qtyvga: string

    @Column({ default: 1 })
    qtypsu: number

    @Column({ default: 1 })
    qtycase: number

    @Column({ default: 1 })
    qtymonitor: number

    @Column({ default: 1 })
    qtykeyboard: number

    @Column({ default: 1 })
    qtymouse: number

    @Column({ default: 1 })
    qtyled: number

    @Column({ default: 1 })
    qtyradiators: number

    @OneToOne(() => UserEntity, (user) => user.build)
    @JoinColumn()
    user: UserEntity;
}
