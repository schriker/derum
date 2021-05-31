import {MigrationInterface, QueryRunner} from "typeorm";

export class PhotoEntity1622467879675 implements MigrationInterface {
    name = 'PhotoEntity1622467879675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "path" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "photoId" integer`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "UQ_cee15358c25a680954a188b6b3e" UNIQUE ("photoId")`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_cee15358c25a680954a188b6b3e" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_cee15358c25a680954a188b6b3e"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "UQ_cee15358c25a680954a188b6b3e"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "photoId"`);
        await queryRunner.query(`DROP TABLE "photo"`);
    }

}
