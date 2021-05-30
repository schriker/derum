import {MigrationInterface, QueryRunner} from "typeorm";

export class LinkNullableFields1622371863488 implements MigrationInterface {
    name = 'LinkNullableFields1622371863488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" ALTER COLUMN "author" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "link" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "link" ALTER COLUMN "photo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" ALTER COLUMN "photo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "link" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "link" ALTER COLUMN "author" SET NOT NULL`);
    }

}
