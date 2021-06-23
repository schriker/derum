import {MigrationInterface, QueryRunner} from "typeorm";

export class UserSession1624426474907 implements MigrationInterface {
    name = 'UserSession1624426474907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_session" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "ip" character varying NOT NULL, "userAgent" character varying NOT NULL, "sessionId" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_adf3b49590842ac3cf54cac451a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_session" ADD CONSTRAINT "FK_b5eb7aa08382591e7c2d1244fe5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_session" DROP CONSTRAINT "FK_b5eb7aa08382591e7c2d1244fe5"`);
        await queryRunner.query(`DROP TABLE "user_session"`);
    }

}
