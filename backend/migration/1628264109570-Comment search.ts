import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommentSearch1628264109570 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE INDEX document_comment_idx ON comment USING GIN (document);
    UPDATE comment SET document = to_tsvector(body);
    CREATE FUNCTION documents_search_comment_trigger() RETURNS trigger AS $$
    begin
    new.document := to_tsvector(new.body);
    return new;
    end
    $$ LANGUAGE plpgsql;
    CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
        ON comment FOR EACH ROW EXECUTE PROCEDURE documents_search_comment_trigger();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
