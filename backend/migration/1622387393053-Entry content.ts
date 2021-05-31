import {MigrationInterface, QueryRunner} from "typeorm";

export class EntryContent1622387393053 implements MigrationInterface {
    name = 'EntryContent1622387393053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ADD "url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "publisher" character varying`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "body" character varying`);
        await queryRunner.query(`CREATE TYPE "entry_type_enum" AS ENUM('link', 'articel', 'video')`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "type" "entry_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "linkId" integer`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_95d6d669b3063a093f6d60293b3" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_9f744fcec0fd2c0ddd962823dc0" FOREIGN KEY ("linkId") REFERENCES "link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_9f744fcec0fd2c0ddd962823dc0"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_95d6d669b3063a093f6d60293b3"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "linkId"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "authorId"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "entry_type_enum"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "body"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "publisher"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "url"`);
    }

}
