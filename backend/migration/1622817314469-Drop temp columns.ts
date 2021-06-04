import {MigrationInterface, QueryRunner} from "typeorm";

export class DropTempColumns1622817314469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "userVote"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "voteScore"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
