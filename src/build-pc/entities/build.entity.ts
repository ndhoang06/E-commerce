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

    @OneToOne(() => UserEntity, (user) => user.build)
    @JoinColumn()
    user: UserEntity;
}
