import {MigrationInterface, QueryRunner} from "typeorm";

export class Notifications1624524125465 implements MigrationInterface {
    name = 'Notifications1624524125465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "objectType"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "objectType" "notification_objecttype_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "objectType"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "objectType" character varying NOT NULL`);
    }

}
