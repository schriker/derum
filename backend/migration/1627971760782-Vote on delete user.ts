import {MigrationInterface, QueryRunner} from "typeorm";

export class VoteOnDeleteUser1627971760782 implements MigrationInterface {
    name = 'VoteOnDeleteUser1627971760782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_daa65ade02b2c2fdfbcb37d5d2f"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_daa65ade02b2c2fdfbcb37d5d2f" FOREIGN KEY ("pointForId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_daa65ade02b2c2fdfbcb37d5d2f"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_daa65ade02b2c2fdfbcb37d5d2f" FOREIGN KEY ("pointForId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
