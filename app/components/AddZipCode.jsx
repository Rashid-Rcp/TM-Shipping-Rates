import { Layout, Card, Text, Button, InlineStack,BlockStack, Divider } from "@shopify/polaris";
import { useState, useEffect } from 'react';
import { useNavigation } from "@remix-run/react";
import ZipCodeForm from "./ZipCodeForm";

export default function AddZipCode(props) {

  const{ rates, submit } = props;
  const nav = useNavigation();

  const [rate1, setRate1] = useState({
    serviceName: rates ? (rates[0]?.service_name ?? '') : '',
    serviceNameValid: rates ? (rates[0]?.service_name !== '' ? true : false) : false,
    serviceNameMessage: '',
    serviceCode: rates ? (rates[0]?.service_code ?? '') : '',
    serviceCodeValid: rates ? (rates[0]?.service_code !== '' ? true : false) : false,
    serviceCodeMessage: '',
    pincodes: rates ? rates[0]?.pincodes.map(pin => pin.pincode).join(',') : '',
    pincodesValid: rates ? (rates[0]?.pincodes.length > 0 ? true : false) : false,
    pincodesMessage: '',
    description: rates ? (rates[0]?.description ?? '') : '',
    descriptionValid: rates ? (rates[0]?.description !== '' ? true : false) : false,
    descriptionMessage: '',
    currency: rates ? (rates[0]?.currency ?? '') : '',
    currencyValid: rates ? (rates[0]?.currency !== '' ? true : false) : false,
    currencyMessage: '',
    price: rates ? (rates[0]?.total_price ?? '') : '',
    priceValid: rates ? (rates[0]?.total_price !== '' ? true : false) : false,
    priceMessage: '',
    phoneRequired: rates ? (rates[0]?.phone_required ?? false) : false,
    phoneRequiredValid: true,
    phoneRequiredMessge:'',
    minDeliveryDays: rates ? (rates[0]?.min_delivery_days ?? '') : '',
    minDeliveryDaysValid: rates ? (rates[0]?.min_delivery_days !== '' ? true : false) : false,
    minDeliveryDaysMessage: '',
    maxDeliveryDays: rates ? (rates[0]?.max_delivery_days ?? '') : '',
    maxDeliveryDaysValid: rates ? (rates[0]?.max_delivery_days !== '' ? true : false) : false,
    maxDeliveryDaysMessage: '',
    id: rates ? (rates[0]?.id ?? '') : '',
  });
  
  const [rate2, setRate2] = useState({
    serviceName: rates ? (rates[1]?.service_name ?? '') : '',
    serviceNameValid: rates ? (rates[1]?.service_name !== '' ? true : false) : false,
    serviceNameMessage: '',
    serviceCode: rates ? (rates[1]?.service_code ?? '') : '',
    serviceCodeValid: rates ? (rates[1]?.service_code !== '' ? true : false) : false,
    serviceCodeMessage: '',
    pincodes: rates ? rates[1]?.pincodes.map(pin => pin.pincode).join(',') : '',
    pincodesValid: rates ? (rates[1]?.pincodes.length > 0 ? true : false) : false,
    pincodesMessage: '',
    description: rates ? (rates[1]?.description ?? '') : '',
    descriptionValid: rates ? (rates[1]?.description !== '' ? true : false) : false,
    descriptionMessage: '',
    currency:  rates ? (rates[1]?.currency ?? '') : '',
    currencyValid: rates ? (rates[1]?.currency !== '' ? true : false) : false,
    currencyMessage: '',
    price: rates ? (rates[1]?.total_price ?? '') : '',
    priceValid: rates ? (rates[1]?.total_price !== '' ? true : false) : false,
    priceMessage: '',
    phoneRequired: rates ? (rates[1]?.phone_required ?? false) : false,
    phoneRequiredValid: true,
    phoneRequiredMessge:'',
    minDeliveryDays: rates ? (rates[1]?.min_delivery_days ?? '') : '',
    minDeliveryDaysValid: rates ? (rates[1]?.min_delivery_days !== '' ? true : false) : false,
    minDeliveryDaysMessage: '',
    maxDeliveryDays: rates ? (rates[1]?.max_delivery_days ?? '') : '',
    maxDeliveryDaysValid: rates ? (rates[1]?.max_delivery_days !== '' ? true : false) : false,
    maxDeliveryDaysMessage: '',
    id: rates ? (rates[1]?.id ?? '') : '',
  });

  const[isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    nav.state !== 'idle' &&  setIsLoading(false);
  },[nav]);
 
  const [formInvalidMessage, setFormInvalidMessage] = useState('');

  const updateShippingRates = ()=>{

    const isValid = doFormValidation();
    if(!isValid){
      showFormValidationMessaage('Please fill the requried filed with valid inputs');
      return false;
    }

    const {pincodes1, pincodes2, duplicated} = isPincodeDuplicated(rate1.pincodes, rate2.pincodes);
    if(duplicated !== ''){
      showFormValidationMessaage(`Duplicated pincodes found in Shipping rate 2 and Shipping rate 2 [${duplicated}]`);
      return false;
    }

   const{ DeliveryDaysValid, message } = isDeliveryDaysValid(rate1, rate2);
   if(!DeliveryDaysValid){
      showFormValidationMessaage(message)
      return false;
   }

    const _rate1 = {
      'id':rate1.id,
      'service_name' : rate1.serviceName,
      'service_code': rate1.serviceCode,
      'description': rate1.description,
      'currency': rate1.currency,
      'pincodes': pincodes1,
      'total_price': rate1.price,
      'phone_required' : rate1.phoneRequired,
      'min_delivery_days': rate1.minDeliveryDays,
      'max_delivery_days': rate1.maxDeliveryDays
    }
    const _rate2 = {
      'id':rate2.id,
      'service_name' : rate2.serviceName,
      'service_code': rate2.serviceCode,
      'description': rate2.description,
      'currency': rate2.currency,
      'pincodes': pincodes2,
      'total_price': rate2.price,
      'phone_required' : rate2.phoneRequired,
      'min_delivery_days': rate2.minDeliveryDays,
      'max_delivery_days': rate2.maxDeliveryDays
    }

    submit({ rate1: JSON.stringify(_rate1), rate2:JSON.stringify(_rate2), action:'update_rates' }, { method: "POST" });
    setIsLoading(true);
  };

const isDeliveryDaysValid = (rate1, rate2)=>{
    let isValid = true;
    let message = "";
    if(rate1.minDeliveryDays && rate1.maxDeliveryDays){
      if(rate1.minDeliveryDays > rate1.maxDeliveryDays){
        isValid = false;
        message += "Min devilery days can't be greater than Max deliveiry days for shipping rate 1";
      }
    }
    if(rate2.minDeliveryDays && rate2.maxDeliveryDays){
      if(rate2.minDeliveryDays > rate2.maxDeliveryDays){
        isValid = false;
        message += "\n Min devilery days can't be greater than Max deliveiry days for shipping rate 2";
      }
    }
    return{DeliveryDaysValid:isValid, message:message}
}

  const doFormValidation = () => {
    let isValid = true;
  
    if (!rate1.serviceNameValid || !rate1.serviceCodeValid || !rate1.pincodesValid || 
        !rate1.descriptionValid || !rate1.currencyValid || !rate1.priceValid ||
        !rate2.serviceNameValid || !rate2.serviceCodeValid || !rate2.pincodesValid || 
        !rate2.descriptionValid || !rate2.currencyValid || !rate2.priceValid ||
        !rate1.maxDeliveryDaysValid || !rate1.minDeliveryDaysValid ||
        !rate2.maxDeliveryDaysValid || !rate2.minDeliveryDaysValid
      ) {
      isValid = false;
    }  
    return isValid;
  }

  const isPincodeDuplicated = (pincodes1, pincodes2) => {
      const pincodeArray1 = pincodes1.split(',').map(pincode => pincode.trim());
      const pincodeArray2 = pincodes2.split(',').map(pincode => pincode.trim());
      const pincodeSet1 = new Set(pincodeArray1);
      const pincodeSet2 = new Set(pincodeArray2);
      const duplicatedPincodes = [...pincodeSet1].filter(pincode => pincodeSet2.has(pincode));
      const _pincodes1 = [...pincodeSet1].join(',');
      const _pincodes2 = [...pincodeSet2].join(',');
      return {pincodes1:_pincodes1 , pincodes2:_pincodes2, duplicated:duplicatedPincodes.join(',') };
};

const showFormValidationMessaage = (message)=>{
  setFormInvalidMessage(message);
  setTimeout(function(){
    setFormInvalidMessage('');
  },3000);
}

  return (
    <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                   Provide Shipping rates.
                  </Text>
                </BlockStack>
                <BlockStack gap="200">
                  <Text as="h4" variant="headingMd">
                   Shipping Rates 1
                  </Text>
                  <ZipCodeForm setRate={setRate1} rates={rate1} />
                  <Divider/>
                  <Text as="h4" variant="headingMd">
                   Shipping Rates 2
                  </Text>
                  <ZipCodeForm setRate={setRate2} rates={rate2} />
                </BlockStack>
                {
                  formInvalidMessage !== '' && (<p style={{color:'red'}}>{formInvalidMessage}</p>)
                }
                <InlineStack gap="300">
                  <Button 
                    loading={isLoading}
                    onClick={updateShippingRates}>
                    Update Shipping Rates
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
  );
}