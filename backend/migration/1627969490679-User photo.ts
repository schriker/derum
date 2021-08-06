import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPhoto1627969490679 implements MigrationInterface {
    name = 'UserPhoto1627969490679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "photo" TO "photoId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "photoId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f" UNIQUE ("photoId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "photoId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "photoId" TO "photo"`);
    }

}
