import {MigrationInterface, QueryRunner} from "typeorm";

export class UserSearchDocument1628247659333 implements MigrationInterface {
    name = 'UserSearchDocument1628247659333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "document" tsvector NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "document"`);
    }

}
