import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableUrlOfEntry1623151535255 implements MigrationInterface {
  name = 'NullableUrlOfEntry1623151535255';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" ALTER COLUMN "url" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" ALTER COLUMN "url" SET NOT NULL`,
    );
  }
}
