import {MigrationInterface, QueryRunner} from "typeorm";

export class UserPonts1626870641887 implements MigrationInterface {
    name = 'UserPonts1626870641887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" ADD "pointForId" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_daa65ade02b2c2fdfbcb37d5d2" ON "vote" ("pointForId") `);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_daa65ade02b2c2fdfbcb37d5d2f" FOREIGN KEY ("pointForId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_daa65ade02b2c2fdfbcb37d5d2f"`);
        await queryRunner.query(`DROP INDEX "IDX_daa65ade02b2c2fdfbcb37d5d2"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP COLUMN "pointForId"`);
    }

}
