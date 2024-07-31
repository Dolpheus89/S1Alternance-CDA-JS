import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStructure1719436603422 implements MigrationInterface {
    name = 'CreateStructure1719436603422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_ad" (
            "id" integer PRIMARY KEY,
            "title" varchar(100) NOT NULL,
            "description" text,
            "owner" varchar(100) NOT NULL,
            "price" int DEFAULT (0),
            "picture" varchar(100),
            "location" varchar(100),
            "createdAt" date DEFAULT (CURRENT_TIMESTAMP),
            "category_id" integer NOT NULL DEFAULT (3)
        )`);
        await queryRunner.query(`INSERT INTO "temporary_ad"("id", "title", "description", "owner", "price", "picture", "location", "createdAt", "category_id") SELECT "id", "title", "description", "owner", "price", "picture", "location", "createdAt", "category_id" FROM "ad"`);
        await queryRunner.query(`DROP TABLE "ad"`);
        await queryRunner.query(`ALTER TABLE "temporary_ad" RENAME TO "ad"`);

        await queryRunner.query(`CREATE TABLE "temporary_categories" ("id" integer PRIMARY KEY, "name" varchar(100) NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_categories"("id", "name") SELECT "id", "name" FROM "categories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`ALTER TABLE "temporary_categories" RENAME TO "categories"`);

        // Corrected step to avoid duplicate column creation
        await queryRunner.query(`CREATE TABLE "temporary_ad" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            "title" varchar(100) NOT NULL,
            "description" varchar,
            "owner" varchar(100) NOT NULL,
            "price" integer,
            "picture" varchar,
            "location" varchar,
            "createdAt" datetime,
            "category_id" integer,
            CONSTRAINT "FK_0a7dda8d426e57781b0c45b759a" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`);
        await queryRunner.query(`INSERT INTO "temporary_ad"("id", "title", "description", "owner", "price", "picture", "location", "createdAt", "category_id") SELECT "id", "title", "description", "owner", "price", "picture", "location", "createdAt", "category_id" FROM "ad"`);
        await queryRunner.query(`DROP TABLE "ad"`);
        await queryRunner.query(`ALTER TABLE "temporary_ad" RENAME TO "ad"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" RENAME TO "temporary_ad"`);
        await queryRunner.query(`CREATE TABLE "ad" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            "title" varchar(100) NOT NULL,
            "description" varchar,
            "owner" varchar(100) NOT NULL,
            "price" integer,
            "picture" varchar,
            "location" varchar,
            "createdAt" datetime,
            "category_id" integer,
            CONSTRAINT "FK_0a7dda8d426e57781b0c45b759a" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        )`);
        await queryRunner.query(`INSERT INTO "ad"("id", "title", "description", "owner", "price", "picture", "location", "createdAt", "category_id") SELECT "id", "title", "description", "owner", "price", "picture", "location", "createdAt", "category_id" FROM "temporary_ad"`);
        await queryRunner.query(`DROP TABLE "temporary_ad"`);
        await queryRunner.query(`ALTER TABLE "categories" RENAME TO "temporary_categories"`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" integer PRIMARY KEY, "name" varchar(100) NOT NULL)`);
        await queryRunner.query(`INSERT INTO "categories"("id", "name") SELECT "id", "name" FROM "temporary_categories"`);
        await queryRunner.query(`DROP TABLE "temporary_categories"`);
        await queryRunner.query(`ALTER TABLE "ad" RENAME TO "temporary_ad"`);
        await queryRunner.query(`CREATE TABLE "ad" (
            "id" integer PRIMARY KEY,
            "title" varchar(100) NOT NULL,
            "description" text,
            "owner" varchar(100) NOT NULL,
            "price" int DEFAULT (0),
            "picture" varchar(100),
            "location" varchar(100),
            "createdAt" date DEFAULT (CURRENT_TIMESTAMP),
            "category_id" integer NOT NULL DEFAULT (3)
        )`);
        await queryRunner.query(`INSERT INTO "ad"("id", "title", "description", "owner", "price", "picture", "location", "createdAt", "category_id") SELECT "id", "title", "description", "owner", "price", "picture", "location", "createdAt", "category_id" FROM "temporary_ad"`);
        await queryRunner.query(`DROP TABLE "temporary_ad"`);
    }
}
