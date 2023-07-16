import { MigrationInterface, QueryRunner } from "typeorm"

export class addCategory1669358429287 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "insert into category (category_name) values ('Mobiles'),('Computer'),('Home Appliances')"
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
