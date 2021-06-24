import {MigrationInterface, QueryRunner} from "typeorm";

export class Notifications1624523274905 implements MigrationInterface {
    name = 'Notifications1624523274905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "notification_objecttype_enum" AS ENUM('REPLY', 'COMMENT')`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "url" character varying NOT NULL, "objectId" integer NOT NULL, "objectType" "notification_objecttype_enum" NOT NULL, "readed" boolean NOT NULL DEFAULT false, "deleted" boolean NOT NULL DEFAULT false, "userId" integer, "triggeredById" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "triggeredById"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "triggeredById" integer`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "color" SET DEFAULT '#42E766'`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "objectType"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "objectType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_c92896cb6e2ad3324633bcf2f33" FOREIGN KEY ("triggeredById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_c92896cb6e2ad3324633bcf2f33"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "objectType"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "objectType" "notification_objecttype_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "color" SET DEFAULT '#3045FC'`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "triggeredById"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "triggeredById" integer`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "userId" integer`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "notification_objecttype_enum"`);
    }

}
