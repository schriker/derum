import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPassword1626553265316 implements MigrationInterface {
    name = 'UserPassword1626553265316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "emailVerificationToken" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordResetToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordResetToken"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "emailVerificationToken"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
