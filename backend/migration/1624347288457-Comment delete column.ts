import {MigrationInterface, QueryRunner} from "typeorm";

export class CommentDeleteColumn1624347288457 implements MigrationInterface {
    name = 'CommentDeleteColumn1624347288457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "deleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "deleted"`);
    }

}
