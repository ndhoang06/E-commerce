import { MigrationInterface, QueryRunner } from "typeorm"

const CATEGORY = [
    {
        id: '8ca1f26f-9817-4eb9-9fa6-5f374dc84a29',
        name: 'Máy in, Scan, Vật tư máy in'
    },
    {
        id: '2569bb30-65d1-43bd-9d9c-a32047d85217',
        name: 'Phím chuột, Gaming Gear'
    },
    {
        id: 'e5958894-2132-44aa-966b-7e5c2eead2d9',
        name: 'Máy chiếu, Camera, TBVP'
    },
    {
        id: 'af4ffffc-c8f0-49d0-9165-fcc3b50e9902',
        name: 'Linh kiện máy tính'
    },
    {
        id: 'c0c79987-9a86-41dd-b148-0384b87941a9',
        name: 'Tai nghe, Webcam, Phụ kiện công nghệ'
    },
    {
        id: '05d4fbf1-e7f0-4438-95e8-9fe282240608',
        name: 'Apple Center'
    },
    {
        id: 'db4a3cd1-41b6-4ca2-b17b-bbb0ba211ece',
        name: 'Màn hình máy tính'
    },
    {
        id: '9274643b-db7b-4897-94c9-c5affdf7c483',
        name: 'Thiết bị mạng'
    },
    {
        id: 'b109d231-1de1-4295-a4a7-0ee69fdb14d5',
        name: 'Phụ kiện công nghệ'
    },
    {
        id: '9733a4af-637a-41cc-a744-720d5179a446',
        name: 'Máy tính xách tay'
    },
    {
        id: '2934d10f-9404-4f10-b108-6400747d4cad',
        name: 'Máy tính để bàn'
    }
]

export class SeedCaterogy1697423926651 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const data of CATEGORY) {
            await queryRunner.query(`INSERT INTO "category_entity"("id","name")
                                    VALUES('${data.id}','${data.name}')`)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const data of CATEGORY) {
            await queryRunner.query(`DELETE FROM "category_entity" WHERE name = '${data.name}'`)
        }
    }
}
