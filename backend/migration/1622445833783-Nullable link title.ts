import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableLinkTitle1622445833783 implements MigrationInterface {
    name = 'NullableLinkTitle1622445833783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" ALTER COLUMN "title" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "link" ALTER COLUMN "title" SET NOT NULL`);
    }

}
