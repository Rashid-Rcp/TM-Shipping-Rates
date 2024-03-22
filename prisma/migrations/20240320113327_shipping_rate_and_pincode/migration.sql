-- CreateTable
CREATE TABLE "ShippingRates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "service_name" TEXT NOT NULL,
    "service_code" TEXT NOT NULL,
    "total_price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "currency" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pincodes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shipping_rate_id" INTEGER NOT NULL,
    "pincode" TEXT NOT NULL,
    CONSTRAINT "Pincodes_shipping_rate_id_fkey" FOREIGN KEY ("shipping_rate_id") REFERENCES "ShippingRates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
