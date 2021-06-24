import {MigrationInterface, QueryRunner} from "typeorm";

export class NotificationsParent1624531551226 implements MigrationInterface {
    name = 'NotificationsParent1624531551226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" ADD "parentId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "parentId"`);
    }

}
