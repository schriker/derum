import {MigrationInterface, QueryRunner} from "typeorm";

export class PhotosURL1622480319411 implements MigrationInterface {
    name = 'PhotosURL1622480319411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" RENAME COLUMN "path" TO "url"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" RENAME COLUMN "url" TO "path"`);
    }

}
