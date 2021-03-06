# Migration `20200107172635-init`

This migration has been generated by philippspo at 1/7/2020, 5:26:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `prisma`.`Post` (
  `content` varchar(191)   ,
  `createdAt` datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  `id` varchar(191) NOT NULL  ,
  `published` boolean NOT NULL DEFAULT false ,
  `title` varchar(191) NOT NULL DEFAULT '' ,
  `updatedAt` datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY (`id`)
)
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `prisma`.`User` (
  `email` varchar(191) NOT NULL DEFAULT '' ,
  `id` varchar(191) NOT NULL  ,
  `name` varchar(191)   ,
  `password` varchar(191) NOT NULL DEFAULT '' ,
  PRIMARY KEY (`id`)
)
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `prisma`.`Break` (
  `duration` int   ,
  `id` varchar(191) NOT NULL  ,
  PRIMARY KEY (`id`)
)
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `prisma`.`WorkTime` (
  `end` datetime(3)   ,
  `id` varchar(191) NOT NULL  ,
  `start` datetime(3)   ,
  PRIMARY KEY (`id`)
)
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `prisma`.`Weekday` (
  `date` datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  `id` varchar(191) NOT NULL  ,
  PRIMARY KEY (`id`)
)
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `prisma`.`Post` ADD COLUMN `author` varchar(191)  ,
ADD FOREIGN KEY (`author`) REFERENCES `prisma`.`User`(`id`) ON DELETE SET NULL;

ALTER TABLE `prisma`.`Break` ADD COLUMN `weekday` varchar(191)  ,
ADD FOREIGN KEY (`weekday`) REFERENCES `prisma`.`Weekday`(`id`) ON DELETE SET NULL;

ALTER TABLE `prisma`.`WorkTime` ADD COLUMN `weekday` varchar(191)  ,
ADD FOREIGN KEY (`weekday`) REFERENCES `prisma`.`Weekday`(`id`) ON DELETE SET NULL;

CREATE UNIQUE INDEX `User.email` ON `prisma`.`User`(`email`)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200107172635-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,45 @@
+generator photon {
+  provider = "photonjs"
+  binaryTargets = ["native", "debian-openssl-1.1.x"]
+}
+
+datasource db {
+  provider = "mysql"
+  url      = env("MYSQL_URL")
+}
+
+model Post {
+  id        String   @default(cuid()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  published Boolean  @default(false)
+  title     String
+  content   String?
+  author    User?
+}
+
+model User {
+  id       String  @default(cuid()) @id
+  email    String  @unique
+  password String
+  name     String?
+  posts    Post[]
+}
+
+model Break {
+  id       String @default(cuid()) @id
+  duration Int?
+}
+
+model WorkTime {
+  id    String   @default(cuid()) @id
+  start DateTime?
+  end   DateTime?
+}
+
+model Weekday {
+  id        String     @default(cuid()) @id
+  date      DateTime
+  workTimes WorkTime[]
+  breaks    Break[]
+}
```


