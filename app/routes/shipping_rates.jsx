import { json } from "@remix-run/node"; // or cloudflare/deno
import prisma from "../prisma";
import moment from 'moment';

export const loader = async ({request}) => { };

export const action = async ({ request}) => {
  
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }
  
  const payload = await request.json();
  const postal_code = payload?.rate?.destination?.postal_code ?? false;
  
  const getDeliveryDate= (daysFromNow)=>{
    if(!daysFromNow)
      return null;
    let currentDate = moment();
    currentDate.add(daysFromNow, 'days');
    let formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss Z');
    return formattedDate;
  }

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
            currency: shippingRate.currency,
            phone_required: shippingRate.phone_required,
            min_delivery_date: getDeliveryDate(shippingRate.min_delivery_days),
            max_delivery_date: getDeliveryDate(shippingRate.max_delivery_days)
          }
        ]
      };
      return json(data);
    }
  }
  return null;
};