import {MigrationInterface, QueryRunner} from "typeorm";

export class RoomOnDeleteUser1627970471900 implements MigrationInterface {
    name = 'RoomOnDeleteUser1627970471900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_fb34ea6e759a075be6955b30797"`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_fb34ea6e759a075be6955b30797" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_fb34ea6e759a075be6955b30797"`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_fb34ea6e759a075be6955b30797" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
