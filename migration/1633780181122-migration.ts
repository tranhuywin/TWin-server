import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1633780181122 implements MigrationInterface {
    name = 'migration1633780181122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`color\` (\`Color_id\` int NOT NULL AUTO_INCREMENT, \`color\` varchar(255) NOT NULL, \`extra_price\` int NOT NULL, \`phonePhoneId\` int NULL, PRIMARY KEY (\`Color_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`phone\` CHANGE \`product_id\` \`product_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`phone\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`phone\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`phone\` ADD \`phone_id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`phone\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` ADD CONSTRAINT \`FK_edcec8fe70f5f22d9b791616963\` FOREIGN KEY (\`phonePhoneId\`) REFERENCES \`phone\`(\`phone_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`color\` DROP FOREIGN KEY \`FK_edcec8fe70f5f22d9b791616963\``);
        await queryRunner.query(`ALTER TABLE \`phone\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`phone\` DROP COLUMN \`phone_id\``);
        await queryRunner.query(`ALTER TABLE \`phone\` ADD \`product_id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`phone\` ADD PRIMARY KEY (\`product_id\`)`);
        await queryRunner.query(`ALTER TABLE \`phone\` CHANGE \`product_id\` \`product_id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`DROP TABLE \`color\``);
    }

}
