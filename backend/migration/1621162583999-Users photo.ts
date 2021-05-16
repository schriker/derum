import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersPhoto1621162583999 implements MigrationInterface {
    name = 'UsersPhoto1621162583999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "photo" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photo"`);
    }

}
