import {MigrationInterface, QueryRunner} from "typeorm";

export class LinkVideoDelete1622375107950 implements MigrationInterface {
    name = 'LinkVideoDelete1622375107950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" DROP COLUMN "video"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" ADD "video" character varying`);
    }

}
