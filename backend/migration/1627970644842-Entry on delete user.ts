import {MigrationInterface, QueryRunner} from "typeorm";

export class EntryOnDeleteUser1627970644842 implements MigrationInterface {
    name = 'EntryOnDeleteUser1627970644842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_95d6d669b3063a093f6d60293b3"`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_95d6d669b3063a093f6d60293b3" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_95d6d669b3063a093f6d60293b3"`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_95d6d669b3063a093f6d60293b3" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
