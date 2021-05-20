import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableUserPhoto1621509077292 implements MigrationInterface {
    name = 'NullableUserPhoto1621509077292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "photo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "photo" SET NOT NULL`);
    }

}
