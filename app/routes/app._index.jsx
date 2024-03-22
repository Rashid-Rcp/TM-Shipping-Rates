import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import prisma from "../prisma";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  InlineStack,
  TextField,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import  RegisterShippingService  from "../components/RegisterShippingService";
import AddZipCode from "../components/AddZipCode";

export const loader = async ({ request }) => {

  // await authenticate.admin(request);
  const { admin, session } = await authenticate.admin(request);
  let response =  await admin.rest.resources.CarrierService.all({
    session: session,
  });

  let rates =  null;
  if(response.data.length){
     rates = await prisma.shippingRates.findMany({
      include: {
        pincodes: {
          select: {
            pincode: true
          }
        }
      }
    });
  }
  return json({shipping: response.data, rates:rates});
};

export const action = async ({ request }) => {
  
  const { admin, session } = await authenticate.admin(request); 
  const body = await request.formData();

  let response ;
  switch (request.method) {
    case "POST": {
 
      if(body.get('action') === 'update_rates'){

        const rate1 = JSON.parse(body.get('rate1'));
        const rate2 = JSON.parse(body.get('rate2'));
        let rate1Response = await handleRate(rate1);
        let rate2Response =  await handleRate(rate2);
        return json({rate1: rate1Response, rate2: rate2Response })

      }
      else{
        const carrier_service = new admin.rest.resources.CarrierService({session: session});
        carrier_service.name = body.get('name');
        carrier_service.callback_url = "https://observed-protection-syndicate-tanks.trycloudflare.com/shipping_rates";
        carrier_service.service_discovery = true;
        response = await carrier_service.save({
          update: true,
        });
      }
      break;
  
    }
    case "PUT": {
     
      const carrier_service = new admin.rest.resources.CarrierService({session: session});
      carrier_service.id = body.get('id');
      carrier_service.name = body.get('name');
      response = await carrier_service.save({
        update: true,
      });
      break;
    }
    case "DELETE": {
      
      response = await admin.rest.resources.CarrierService.delete({
        session: session,
        id: body.get('id'),
      });
      deleteAllShippingRates();
      break;
    }
  }
  return json({data: response });
};


const handleRate = async (rate) => {
  if (rate.id) {
    await shippingUpdateRates(rate);
  } else {
    await shippingInsertRates(rate);
  }
};

const shippingInsertRates = async (rates) => {

  const pincodeArray = rates.pincodes.split(',').map(pincode => ({ pincode: pincode.trim() }));

  await prisma.shippingRates.create({
    data: {
      service_name: rates.service_name,
      service_code: rates.service_code,
      total_price: Number(rates.total_price),
      description: rates.description,
      currency: rates.currency,
      pincodes: {
        create: pincodeArray
      }
    },
    include: {
      pincodes: true
    }
  });
};

const shippingUpdateRates = async (rates) => {
  const newPincodes = rates.pincodes.split(',').map(pincode => pincode.trim());

  const existingPincodes = await prisma.pincodes.findMany({
    where: {
      shipping_rate_id: rates.id
    }
  });

  const existingPincodeValues = existingPincodes.map(pincode => pincode.pincode);
  const pincodesToDelete = existingPincodeValues.filter(pincode => !newPincodes.includes(pincode));
  const pincodesToInsert = newPincodes.filter(pincode => !existingPincodeValues.includes(pincode));

  await prisma.shippingRates.update({
    where: { id: rates.id },
    data: {
      service_name: rates.service_name,
      service_code: rates.service_code,
      total_price: Number(rates.total_price),
      description: rates.description,
      currency: rates.currency
    }
  });

  if(pincodesToDelete.length !== 0){
    await prisma.pincodes.deleteMany({
      where: {
        shipping_rate_id: rates.id,
        pincode: {
          in: pincodesToDelete
        }
      }
    });
  }

if(pincodesToInsert.length !== 0){
  await Promise.all(pincodesToInsert.map(async pincode => {
    await prisma.pincodes.create({
      data: {
        shipping_rate_id: rates.id,
        pincode: pincode
      }
    });
  }));
}

};

const deleteAllShippingRates = async()=>{
  try {
    await prisma.pincodes.deleteMany();
    await prisma.shippingRates.deleteMany();
  } catch (error) {
    console.error('Error deleting data:', error);
    return false;
  } 
  return true
}


export default function Index() {

  const {shipping, rates} =  useLoaderData();
  const hasShippingRate = shipping.length;
  const submit = useSubmit();

  return (
    
    <Page>
      <ui-title-bar title="Shipping Rate Manage" />
      <BlockStack gap="500">
        <RegisterShippingService shipping={shipping} submit={submit} />
        {
          hasShippingRate !== 0 && (<AddZipCode rates={rates} submit={submit}/>)
        }
      </BlockStack>
    </Page>
  );
}