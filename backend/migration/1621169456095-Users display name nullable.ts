import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersDisplayNameNullable1621169456095 implements MigrationInterface {
    name = 'UsersDisplayNameNullable1621169456095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "displayName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "displayName" SET NOT NULL`);
    }

}
