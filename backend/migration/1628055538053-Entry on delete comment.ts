import {MigrationInterface, QueryRunner} from "typeorm";

export class EntryOnDeleteComment1628055538053 implements MigrationInterface {
    name = 'EntryOnDeleteComment1628055538053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_0c76bf6a487e8ae22a9a3b21892"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_0c76bf6a487e8ae22a9a3b21892" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_0c76bf6a487e8ae22a9a3b21892"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_0c76bf6a487e8ae22a9a3b21892" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
