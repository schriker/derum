import {MigrationInterface, QueryRunner} from "typeorm";

export class PhotoKey1626419944671 implements MigrationInterface {
    name = 'PhotoKey1626419944671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" ALTER COLUMN "key" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" ALTER COLUMN "key" SET DEFAULT ''`);
    }

}
