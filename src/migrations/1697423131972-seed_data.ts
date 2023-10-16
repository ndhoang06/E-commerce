import { MigrationInterface, QueryRunner } from "typeorm"

const TRADE_MARK = [
    {
        name: 'LG',
        image: ''
    },
    {
        name: 'Microsoft',
        image: ''
    },
    {
        name: 'ASUS',
        image: ''
    },
    {
        name: 'MSI',
        image: ''
    },
    {
        name: 'ACER',
        image: ''
    },
    {
        name: 'DELL',
        image: ''
    },
    {
        name: 'HP',
        image: ''
    },
    {
        name: 'LENOVO',
        image: ''
    },
]

export class SeedData1697423131972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const data of TRADE_MARK) {
            await queryRunner.query(`INSERT INTO "trademark_entity"("id","name","image")
                                    VALUES(DEFAULT,'${data.name}','${data.image}')`)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const data of TRADE_MARK) {
            await queryRunner.query(
                `DELETE FROM "trademark_entity" WHERE name = '${data.name}'`
            )
        }
    }

}
