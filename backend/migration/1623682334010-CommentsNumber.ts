import {MigrationInterface, QueryRunner} from "typeorm";

export class CommentsNumber1623682334010 implements MigrationInterface {
    name = 'CommentsNumber1623682334010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ADD "commentsNumber" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "commentsNumber"`);
    }

}
