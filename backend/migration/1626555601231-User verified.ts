import {MigrationInterface, QueryRunner} from "typeorm";

export class UserVerified1626555601231 implements MigrationInterface {
    name = 'UserVerified1626555601231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "verified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verified"`);
    }

}
