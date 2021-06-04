import {MigrationInterface, QueryRunner} from "typeorm";

export class VotesTestTypes1622814375984 implements MigrationInterface {
    name = 'VotesTestTypes1622814375984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ADD "voteScore" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "voteScore"`);
    }

}
