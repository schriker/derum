import {MigrationInterface, QueryRunner} from "typeorm";

export class TimestampZ1620990885722 implements MigrationInterface {
    name = 'TimestampZ1620990885722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "room" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "room" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "room" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "room" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
