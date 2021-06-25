import {MigrationInterface, QueryRunner} from "typeorm";

export class EmojisInitail1624626090410 implements MigrationInterface {
    name = 'EmojisInitail1624626090410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emoji" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "file" character varying NOT NULL, "roomId" integer, CONSTRAINT "PK_df74ce05e24999ee01ea0bc50a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "emoji" ADD CONSTRAINT "FK_0fcf223678511b1c2d94590a5a9" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emoji" DROP CONSTRAINT "FK_0fcf223678511b1c2d94590a5a9"`);
        await queryRunner.query(`DROP TABLE "emoji"`);
    }

}
