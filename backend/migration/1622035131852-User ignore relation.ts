import {MigrationInterface, QueryRunner} from "typeorm";

export class UserIgnoreRelation1622035131852 implements MigrationInterface {
    name = 'UserIgnoreRelation1622035131852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_ignore_user" ("userId_1" integer NOT NULL, "userId_2" integer NOT NULL, CONSTRAINT "PK_19b76e65935ed560ea9263a527e" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9759fabff78fd344f68cc4a982" ON "user_ignore_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_677ff1105699a71b7941fa9cff" ON "user_ignore_user" ("userId_2") `);
        await queryRunner.query(`ALTER TABLE "user_ignore_user" ADD CONSTRAINT "FK_9759fabff78fd344f68cc4a982b" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_ignore_user" ADD CONSTRAINT "FK_677ff1105699a71b7941fa9cff9" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_ignore_user" DROP CONSTRAINT "FK_677ff1105699a71b7941fa9cff9"`);
        await queryRunner.query(`ALTER TABLE "user_ignore_user" DROP CONSTRAINT "FK_9759fabff78fd344f68cc4a982b"`);
        await queryRunner.query(`DROP INDEX "IDX_677ff1105699a71b7941fa9cff"`);
        await queryRunner.query(`DROP INDEX "IDX_9759fabff78fd344f68cc4a982"`);
        await queryRunner.query(`DROP TABLE "user_ignore_user"`);
    }

}
