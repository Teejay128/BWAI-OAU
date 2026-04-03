-- CreateTable
CREATE TABLE "WhatWasBuiltConfig" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "liveCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhatWasBuiltConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatWasBuiltProject" (
    "id" SERIAL NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "community" TEXT NOT NULL,
    "tags" TEXT[],
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "techTags" TEXT[],
    "demoHref" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "configId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "WhatWasBuiltProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WhatWasBuiltProject_configId_displayOrder_idx" ON "WhatWasBuiltProject"("configId", "displayOrder");

-- AddForeignKey
ALTER TABLE "WhatWasBuiltProject" ADD CONSTRAINT "WhatWasBuiltProject_configId_fkey" FOREIGN KEY ("configId") REFERENCES "WhatWasBuiltConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
