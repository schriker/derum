import {MigrationInterface, QueryRunner} from "typeorm";

export class UserSettings1624454412285 implements MigrationInterface {
    name = 'UserSettings1624454412285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "showNotifications" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "showAvatars" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "showColorNames" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "color" character varying NOT NULL DEFAULT '#3045FC'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "color"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "showColorNames"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "showAvatars"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "showNotifications"`);
    }

}
