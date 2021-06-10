import { MigrationInterface, QueryRunner } from 'typeorm';

export class BlacklistPublisher1623306981127 implements MigrationInterface {
  name = 'BlacklistPublisher1623306981127';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blacklistPublisher" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_2e6fb74084e2690fdff479e5c34" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "blacklistPublisher"`);
  }
}
