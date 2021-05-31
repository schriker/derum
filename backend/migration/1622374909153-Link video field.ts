import {MigrationInterface, QueryRunner} from "typeorm";

export class LinkVideoField1622374909153 implements MigrationInterface {
    name = 'LinkVideoField1622374909153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" ADD "video" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_8dece3c96270b99f144d26e4a7" ON "link" ("url") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_8dece3c96270b99f144d26e4a7"`);
        await queryRunner.query(`ALTER TABLE "link" DROP COLUMN "video"`);
    }

}
