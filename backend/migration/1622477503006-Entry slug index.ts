import {MigrationInterface, QueryRunner} from "typeorm";

export class EntrySlugIndex1622477503006 implements MigrationInterface {
    name = 'EntrySlugIndex1622477503006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_965fad0249ae8ca6200f210180" ON "entry" ("slug") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_965fad0249ae8ca6200f210180"`);
    }

}
