import {MigrationInterface, QueryRunner} from "typeorm";

export class EntrySlug1622477291318 implements MigrationInterface {
    name = 'EntrySlug1622477291318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "slug"`);
    }

}
