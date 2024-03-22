import { json } from "@remix-run/node"; // or cloudflare/deno
import prisma from "../prisma";

export const loader = async ({request}) => { };

export const action = async ({ request}) => {
  
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }
  
  const payload = await request.json();
  const postal_code = payload?.rate?.destination?.postal_code ?? false;
  
  if (postal_code) {
    const shippingRate = await prisma.shippingRates.findFirst({
      where: {
        pincodes: {
          some: {
            pincode: postal_code
          }
        }
      }
    });
  
    if (shippingRate) {
      const data = {
        rates: [
          {
            service_name: shippingRate.service_name,
            service_code: shippingRate.service_code,
            total_price: String(shippingRate.total_price * 100),
            description: shippingRate.description,
            currency: shippingRate.currency
          }
        ]
      };
      return json(data);
    }
  }
  return null;
};