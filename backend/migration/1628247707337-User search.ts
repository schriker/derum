import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSearch1628247707337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE INDEX document_idx ON "user" USING GIN (document);
    UPDATE "user" SET document = to_tsvector("user"."displayName");
    CREATE FUNCTION documents_search_trigger() RETURNS trigger AS $$
    begin
    new.document := to_tsvector(new.displayName);
    return new;
    end
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
        ON "user" FOR EACH ROW EXECUTE PROCEDURE documents_search_trigger();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
