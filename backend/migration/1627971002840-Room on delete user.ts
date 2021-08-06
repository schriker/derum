import {MigrationInterface, QueryRunner} from "typeorm";

export class RoomOnDeleteUser1627971002840 implements MigrationInterface {
    name = 'RoomOnDeleteUser1627971002840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_users_user" DROP CONSTRAINT "FK_764292bbbb93544a050f844c499"`);
        await queryRunner.query(`ALTER TABLE "room_users_user" ADD CONSTRAINT "FK_764292bbbb93544a050f844c499" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_users_user" DROP CONSTRAINT "FK_764292bbbb93544a050f844c499"`);
        await queryRunner.query(`ALTER TABLE "room_users_user" ADD CONSTRAINT "FK_764292bbbb93544a050f844c499" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
