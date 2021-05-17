import {MigrationInterface, QueryRunner} from "typeorm";

export class RoomAuthor1621240469380 implements MigrationInterface {
    name = 'RoomAuthor1621240469380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_fb34ea6e759a075be6955b30797" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_fb34ea6e759a075be6955b30797"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "authorId"`);
    }

}
