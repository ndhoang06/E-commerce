import { MigrationInterface, QueryRunner } from "typeorm"

const TRADE_MARK = [
    {
        name: 'LG',
        image: 'lg_pcrcaf'
    },
    {
        name: 'Microsoft',
        image: 'microsoft_q4p9i0'
    },
    {
        name: 'ASUS',
        image: 'asus_pbvlnu'
    },
    {
        name: 'MSI',
        image: 'msi_utwvsn'
    },
    {
        name: 'ACER',
        image: 'acer_i4sd7w'
    },
    {
        name: 'DELL',
        image: 'dell_c41pzo'
    },
    {
        name: 'HP',
        image: 'hp_trijr6'
    },
    {
        name: 'LENOVO',
        image: 'lenovo_gicpu4'
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
