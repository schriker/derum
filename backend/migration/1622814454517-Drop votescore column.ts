import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropVotescoreColumn1622814454517 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "voteScore"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
