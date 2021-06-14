import {MigrationInterface, QueryRunner} from "typeorm";

export class Comments1623671696871 implements MigrationInterface {
    name = 'Comments1623671696871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "body" character varying NOT NULL, "authorId" integer, "entryId" integer, "parentId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c76bf6a487e8ae22a9a3b2189" ON "comment" ("entryId") `);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_0c76bf6a487e8ae22a9a3b21892" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_e3aebe2bd1c53467a07109be596" FOREIGN KEY ("parentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_e3aebe2bd1c53467a07109be596"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_0c76bf6a487e8ae22a9a3b21892"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`DROP INDEX "IDX_0c76bf6a487e8ae22a9a3b2189"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
