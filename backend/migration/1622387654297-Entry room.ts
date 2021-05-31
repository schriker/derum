import {MigrationInterface, QueryRunner} from "typeorm";

export class EntryRoom1622387654297 implements MigrationInterface {
    name = 'EntryRoom1622387654297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ADD "roomId" integer`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_670748b758dbc2b97edfe0fccf2" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_670748b758dbc2b97edfe0fccf2"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "roomId"`);
    }

}
