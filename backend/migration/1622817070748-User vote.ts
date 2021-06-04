import {MigrationInterface, QueryRunner} from "typeorm";

export class UserVote1622817070748 implements MigrationInterface {
    name = 'UserVote1622817070748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ADD "voteScore" integer`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "userVote" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "userVote"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "voteScore"`);
    }

}
