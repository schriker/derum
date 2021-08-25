import {MigrationInterface, QueryRunner} from "typeorm";

export class StickyEntryAndComment1629882453508 implements MigrationInterface {
    name = 'StickyEntryAndComment1629882453508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "document_weights_idx"`);
        await queryRunner.query(`DROP INDEX "document_comment_idx"`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "sticky" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "sticky" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "sticky"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "sticky"`);
        await queryRunner.query(`CREATE INDEX "document_comment_idx" ON "comment" ("document") `);
        await queryRunner.query(`CREATE INDEX "document_weights_idx" ON "entry" ("document") `);
    }

}
