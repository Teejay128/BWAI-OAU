UPDATE "WhatWasBuiltProject"
SET "community" = "category";

ALTER TABLE "WhatWasBuiltProject"
DROP COLUMN "category";
