import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteFlagForEntries1623248609570 implements MigrationInterface {
  name = 'DeleteFlagForEntries1623248609570';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" ADD "deleted" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "deleted"`);
  }
}
