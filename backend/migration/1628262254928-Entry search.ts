import { MigrationInterface, QueryRunner } from 'typeorm';

export class EntrySearch1628262254928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE INDEX document_weights_idx ON entry USING GIN (document);
    UPDATE entry SET document = setweight(to_tsvector(title), 'A') || setweight(to_tsvector(description), 'B') || setweight(to_tsvector(publisher), 'C');
    CREATE FUNCTION documents_search_entry_trigger() RETURNS trigger AS $$
    begin
    new.document :=
        setweight(to_tsvector(new.title), 'A') ||
        setweight(to_tsvector(new.description), 'B') ||
        setweight(to_tsvector(new.publisher), 'C');
    return new;
    end
    $$ LANGUAGE plpgsql;
    CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
        ON entry FOR EACH ROW EXECUTE PROCEDURE documents_search_entry_trigger();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
