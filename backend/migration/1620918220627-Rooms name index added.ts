import {MigrationInterface, QueryRunner} from "typeorm";

export class RoomsNameIndexAdded1620918220627 implements MigrationInterface {
    name = 'RoomsNameIndexAdded1620918220627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_535c742a3606d2e3122f441b26" ON "room" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_535c742a3606d2e3122f441b26"`);
    }

}
