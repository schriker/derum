import {MigrationInterface, QueryRunner} from "typeorm";

export class RoomPhoto1623580698944 implements MigrationInterface {
    name = 'RoomPhoto1623580698944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blacklist_publisher" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_5dbdd90e68402607061ac4f7063" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "room" ADD "photoId" integer`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "UQ_29213491e363691d407d51fc9ec" UNIQUE ("photoId")`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "voteScore" integer`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "userVote" integer`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_29213491e363691d407d51fc9ec" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_29213491e363691d407d51fc9ec"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "userVote"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "voteScore"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "UQ_29213491e363691d407d51fc9ec"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "photoId"`);
        await queryRunner.query(`DROP TABLE "blacklist_publisher"`);
    }

}
