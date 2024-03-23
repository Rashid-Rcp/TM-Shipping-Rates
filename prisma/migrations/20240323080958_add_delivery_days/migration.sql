-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShippingRates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "service_name" TEXT NOT NULL,
    "service_code" TEXT NOT NULL,
    "total_price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "phone_required" BOOLEAN NOT NULL DEFAULT false,
    "min_delivery_days" INTEGER,
    "max_delivery_days" INTEGER
);
INSERT INTO "new_ShippingRates" ("currency", "description", "id", "service_code", "service_name", "total_price") SELECT "currency", "description", "id", "service_code", "service_name", "total_price" FROM "ShippingRates";
DROP TABLE "ShippingRates";
ALTER TABLE "new_ShippingRates" RENAME TO "ShippingRates";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
