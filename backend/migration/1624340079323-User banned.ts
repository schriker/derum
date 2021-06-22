import {MigrationInterface, QueryRunner} from "typeorm";

export class UserBanned1624340079323 implements MigrationInterface {
    name = 'UserBanned1624340079323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isBanned" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isBanned"`);
    }

}
