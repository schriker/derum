import {MigrationInterface, QueryRunner} from "typeorm";

export class EntryVotescroreColumn1623137702608 implements MigrationInterface {
    name = 'EntryVotescroreColumn1623137702608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ADD "voteScore" integer`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "userVote" integer`);
        await queryRunner.query(`ALTER TYPE "entry_type_enum" RENAME TO "entry_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "entry_type_enum" AS ENUM('link', 'article', 'image', 'video')`);
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "type" TYPE "entry_type_enum" USING "type"::"text"::"entry_type_enum"`);
        await queryRunner.query(`DROP TYPE "entry_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "entry_type_enum_old" AS ENUM('link', 'articel', 'video')`);
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "type" TYPE "entry_type_enum_old" USING "type"::"text"::"entry_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "entry_type_enum"`);
        await queryRunner.query(`ALTER TYPE "entry_type_enum_old" RENAME TO "entry_type_enum"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "userVote"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "voteScore"`);
    }

}
