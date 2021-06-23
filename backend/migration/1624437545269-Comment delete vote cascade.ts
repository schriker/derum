import {MigrationInterface, QueryRunner} from "typeorm";

export class CommentDeleteVoteCascade1624437545269 implements MigrationInterface {
    name = 'CommentDeleteVoteCascade1624437545269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_0bf940c4843f451d25475aae5b4"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_ad37adcff60fdb9670a97868ab1"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_0bf940c4843f451d25475aae5b4" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_ad37adcff60fdb9670a97868ab1" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_ad37adcff60fdb9670a97868ab1"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_0bf940c4843f451d25475aae5b4"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_ad37adcff60fdb9670a97868ab1" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_0bf940c4843f451d25475aae5b4" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
