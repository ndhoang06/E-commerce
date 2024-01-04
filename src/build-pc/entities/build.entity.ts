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
    
    @Column({ default: null })
    qtycpu: number

    @Column({ default: null })
    qtymainboard: number

    @Column({ default: null })
    qtyram: number

    @Column({ default: null })
    qtyhdd: number

    @Column({ default: null })
    qtyssd: number

    @Column({ default: null })
    qtyvga: number

    @Column({ default: null })
    qtypsu: number

    @Column({ default: null })
    qtycase: number

    @Column({ default: null })
    qtymonitor: number

    @Column({ default: null })
    qtykeyboard: number

    @Column({ default: null })
    qtymouse: number

    @Column({ default: null })
    qtyled: number

    @Column({ default: null })
    qtyradiators: number

    @OneToOne(() => UserEntity, (user) => user.build)
    @JoinColumn()
    user: UserEntity;
}
