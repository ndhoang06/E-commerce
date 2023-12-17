import UserEntity, { UserRole } from "src/users/user.entity";
import { MigrationInterface, QueryRunner, createConnection } from 'typeorm';
import { faker } from '@faker-js/faker';

export class SeedUser1702816635281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (let i = 0; i < 100; i++) {
            const user = new UserEntity();
            user.firstName = faker.person.firstName();
            user.lastName = faker.person.lastName().replace(/'/g, '');
            user.picture = "https://lh3.googleusercontent.com/a/ACg8ocIgo8oVnofsl1rjqtyTlhv2iLRRPJ6VnuGvc3Ewd-9h=s96-c"
            user.email = faker.internet.email();
            user.role = UserRole.USER
      
            await queryRunner.query(`INSERT INTO"user_entity"("id","firstName","lastName","picture","email","role")
        VALUES (DEFAULT,'${user.firstName}','${user.lastName}','${user.picture}','${user.email}','${user.role}');`)
          }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
