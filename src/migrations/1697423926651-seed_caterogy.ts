import { MigrationInterface, QueryRunner } from "typeorm"

const CATEGORY = [
    {
        name: 'Máy in, Scan, Vật tư máy in'
    },
    {
        name: 'Phím chuột, Gaming Gear'
    },
    {
        name: 'Máy chiếu, Camera, TBVP'
    },
    {
        name: 'Linh kiện máy tính'
    },
    {
        name: 'Tai nghe, Webcam, Phụ kiện công nghệ'
    },
    {
        name: 'Apple Center'
    },
    {
        name: 'Màn hình máy tính'
    },
    {
        name: 'Thiết bị mạng'
    },
    {
        name: 'PC lắp ráp, đồng bộ, AIO'
    },
    {
        name: 'Máy tính xách tay'
    },
]

export class SeedCaterogy1697423926651 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const data of CATEGORY) {
            await queryRunner.query(`INSERT INTO "category_entity"("id","name")
                                    VALUES(DEFAULT,'${data.name}')`)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const data of CATEGORY) {
            await queryRunner.query(`DELETE FROM "category_entity" WHERE name = '${data.name}'`)
        }
    }
}
