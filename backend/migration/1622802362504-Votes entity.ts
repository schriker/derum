import {MigrationInterface, QueryRunner} from "typeorm";

export class VotesEntity1622802362504 implements MigrationInterface {
    name = 'VotesEntity1622802362504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vote" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "value" integer NOT NULL, "userId" integer, "entryId" integer, CONSTRAINT "vote_user_entry" UNIQUE ("userId", "entryId"), CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f5de237a438d298031d11a57c3" ON "vote" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0bf940c4843f451d25475aae5b" ON "vote" ("entryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_670748b758dbc2b97edfe0fccf" ON "entry" ("roomId") `);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_0bf940c4843f451d25475aae5b4" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_0bf940c4843f451d25475aae5b4"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f5de237a438d298031d11a57c3b"`);
        await queryRunner.query(`DROP INDEX "IDX_670748b758dbc2b97edfe0fccf"`);
        await queryRunner.query(`DROP INDEX "IDX_0bf940c4843f451d25475aae5b"`);
        await queryRunner.query(`DROP INDEX "IDX_f5de237a438d298031d11a57c3"`);
        await queryRunner.query(`DROP TABLE "vote"`);
    }

}
