import {MigrationInterface, QueryRunner} from "typeorm";

export class CommentVotes1623859874034 implements MigrationInterface {
    name = 'CommentVotes1623859874034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" ADD "commentId" integer`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "voteScore" integer`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "userVote" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_ad37adcff60fdb9670a97868ab" ON "vote" ("commentId") `);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_ad37adcff60fdb9670a97868ab1" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_ad37adcff60fdb9670a97868ab1"`);
        await queryRunner.query(`DROP INDEX "IDX_ad37adcff60fdb9670a97868ab"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "userVote"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "voteScore"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP COLUMN "commentId"`);
    }

}
