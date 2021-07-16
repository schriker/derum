import {MigrationInterface, QueryRunner} from "typeorm";

export class PhotoKeyWithDefaultValue1626419907934 implements MigrationInterface {
    name = 'PhotoKeyWithDefaultValue1626419907934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_users_user" DROP CONSTRAINT "FK_6c675caa22685ba1e0ebeb0f654"`);
        await queryRunner.query(`ALTER TABLE "room_users_user" DROP CONSTRAINT "FK_764292bbbb93544a050f844c499"`);
        await queryRunner.query(`ALTER TABLE "user_ignore_user" DROP CONSTRAINT "FK_677ff1105699a71b7941fa9cff9"`);
        await queryRunner.query(`ALTER TABLE "user_ignore_user" DROP CONSTRAINT "FK_9759fabff78fd344f68cc4a982b"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "key" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "room_users_user" ADD CONSTRAINT "FK_764292bbbb93544a050f844c499" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "room_users_user" ADD CONSTRAINT "FK_6c675caa22685ba1e0ebeb0f654" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_ignore_user" ADD CONSTRAINT "FK_9759fabff78fd344f68cc4a982b" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_ignore_user" ADD CONSTRAINT "FK_677ff1105699a71b7941fa9cff9" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_ignore_user" DROP CONSTRAINT "FK_677ff1105699a71b7941fa9cff9"`);
        await queryRunner.query(`ALTER TABLE "user_ignore_user" DROP CONSTRAINT "FK_9759fabff78fd344f68cc4a982b"`);
        await queryRunner.query(`ALTER TABLE "room_users_user" DROP CONSTRAINT "FK_6c675caa22685ba1e0ebeb0f654"`);
        await queryRunner.query(`ALTER TABLE "room_users_user" DROP CONSTRAINT "FK_764292bbbb93544a050f844c499"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "key"`);
        await queryRunner.query(`ALTER TABLE "user_ignore_user" ADD CONSTRAINT "FK_9759fabff78fd344f68cc4a982b" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_ignore_user" ADD CONSTRAINT "FK_677ff1105699a71b7941fa9cff9" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_users_user" ADD CONSTRAINT "FK_764292bbbb93544a050f844c499" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_users_user" ADD CONSTRAINT "FK_6c675caa22685ba1e0ebeb0f654" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
