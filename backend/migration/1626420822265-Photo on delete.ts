import {MigrationInterface, QueryRunner} from "typeorm";

export class PhotoOnDelete1626420822265 implements MigrationInterface {
    name = 'PhotoOnDelete1626420822265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_29213491e363691d407d51fc9ec"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_cee15358c25a680954a188b6b3e"`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_29213491e363691d407d51fc9ec" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_cee15358c25a680954a188b6b3e" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_cee15358c25a680954a188b6b3e"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_29213491e363691d407d51fc9ec"`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_cee15358c25a680954a188b6b3e" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_29213491e363691d407d51fc9ec" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
