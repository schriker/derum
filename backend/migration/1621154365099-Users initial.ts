import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersInitial1621154365099 implements MigrationInterface {
    name = 'UsersInitial1621154365099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "displayName" character varying NOT NULL, "email" character varying NOT NULL, "authProvider" character varying NOT NULL, "authId" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_059e69c318702e93998f26d152" ON "user" ("displayName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP INDEX "IDX_059e69c318702e93998f26d152"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
