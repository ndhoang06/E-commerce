import { MigrationInterface, QueryRunner } from "typeorm"

const TRADE_MARK = [
    {
        id: '8c014d04-786a-4485-ac38-28f8df7e7798',
        name: 'LG',
        image: 'lg_pcrcaf'
    },
    {
        id: '2a16de83-a1e3-439f-a644-0fc385f3e479',
        name: 'Microsoft',
        image: 'microsoft_q4p9i0'
    },
    {
        id: '634a8ef9-0b80-4a80-a216-4a8c4bc1533e',
        name: 'ASUS',
        image: 'asus_pbvlnu'
    },
    {
        id: '450ad8d5-e14a-48d6-882e-29d4992152de',
        name: 'MSI',
        image: 'msi_utwvsn'
    },
    {
        id: '4437dbe5-ee9f-4103-b065-2329b236e51d',
        name: 'ACER',
        image: 'acer_i4sd7w'
    },
    {
        id: 'f78a8431-6bc7-4511-b81d-487991e46288',
        name: 'DELL',
        image: 'dell_c41pzo'
    },
    {
        id: '84405b1a-bcd4-452b-9d81-1cd0aa5c458d',
        name: 'HP',
        image: 'hp_trijr6'
    },
    {
        id: '950db2d0-8069-4895-a8d9-ca2362ea77a3',
        name: 'LENOVO',
        image: 'lenovo_gicpu4'
    },
]

export class SeedData1697423131972 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const data of TRADE_MARK) {
            await queryRunner.query(`INSERT INTO "trademark_entity"("id","name","image")
                                    VALUES('${data.id}','${data.name}','${data.image}')`)
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
