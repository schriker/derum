import {MigrationInterface, QueryRunner} from "typeorm";

export class EntryAndCommentsSearchDocumentColumn1628254896391 implements MigrationInterface {
    name = 'EntryAndCommentsSearchDocumentColumn1628254896391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "document_idx"`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "document" tsvector NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "document" tsvector NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "document"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "document"`);
        await queryRunner.query(`CREATE INDEX "document_idx" ON "user" ("document") `);
    }

}
