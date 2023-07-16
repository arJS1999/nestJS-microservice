import { MigrationInterface, QueryRunner } from "typeorm"

export class createRole1669477028617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "insert into role (role_name) values ('admin'),('seller'),('user')"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
