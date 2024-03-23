import { Layout, Card, Text, TextField, Button, InlineStack,BlockStack, Divider } from "@shopify/polaris";
import { useState, useCallback, useEffect } from 'react';
import { useNavigation } from "@remix-run/react";

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
    id: rates ? (rates[1]?.id ?? '') : '',
  });

  const[isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    nav.state !== 'idle' &&  setIsLoading(false);
  },[nav]);
  
  const handleFieldChange = useCallback((setRate, fieldName, newValue) => {

    let {isValid, message} = doFieldValidation(fieldName, newValue);
    setRate(prevRate => ({
      ...prevRate,
      [fieldName]: newValue,
      [`${fieldName}Valid`]: isValid,
      [`${fieldName}Message`]: message,
    }));

  }, []);

  const doFieldValidation = (fieldName, newValue) => {
    let isValid = true;
    let message = '';
  
    if (newValue.trim() === '') {
      message = `${fieldName} can't be empty`;
      isValid = false;
    } else if (fieldName === 'price' && isNaN(newValue.trim())) {
      message = 'Price must be a number';
      isValid = false;
    } else if (fieldName === 'currency' && !isValidCurrencyCode(newValue.trim())) {
      message = 'Invalid currency code';
      isValid = false;
    }
  
    return { isValid, message };
  };

  const isValidCurrencyCode = (currencyCode) => {
    const currencyCodeRegex = /^[A-Z]{3}$/;
    return currencyCodeRegex.test(currencyCode);
  };
  

  const [formInvalidMessage, setFormInvalidMessage] = useState('');

  const updateShippingRates = ()=>{

    const isValid = doFormValidation();
    if(!isValid){
      setFormInvalidMessage('Please fill the requried filed with valid inputs');
      setTimeout(function(){
        setFormInvalidMessage('');
      },3000);
      return false;
    }

    const {pincodes1, pincodes2, duplicated} = isPincodeDuplicated(rate1.pincodes, rate2.pincodes);
    if(duplicated !== ''){
      setFormInvalidMessage(`Duplicated pincodes found in Shipping rate 2 and Shipping rate 2 [${duplicated}]`);
      setTimeout(function(){
        setFormInvalidMessage('');
      },3000);
      return false;
    }

    const _rate1 = {
      'id':rate1.id,
      'service_name' : rate1.serviceName,
      'service_code': rate1.serviceCode,
      'description': rate1.description,
      'currency': rate1.currency,
      'pincodes': pincodes1,
      'total_price': rate1.price
    }
    const _rate2 = {
      'id':rate2.id,
      'service_name' : rate2.serviceName,
      'service_code': rate2.serviceCode,
      'description': rate2.description,
      'currency': rate2.currency,
      'pincodes': pincodes2,
      'total_price': rate2.price
    }

    submit({ rate1: JSON.stringify(_rate1), rate2:JSON.stringify(_rate2), action:'update_rates' }, { method: "POST" });
    setIsLoading(true);
  };

  const doFormValidation = () => {
    let isValid = true;
  
    if (!rate1.serviceNameValid || !rate1.serviceCodeValid || !rate1.pincodesValid || 
        !rate1.descriptionValid || !rate1.currencyValid || !rate1.priceValid ||
        !rate2.serviceNameValid || !rate2.serviceCodeValid || !rate2.pincodesValid || 
        !rate2.descriptionValid || !rate2.currencyValid || !rate2.priceValid
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
                  <TextField
                    label="Service Name"
                    value={rate1.serviceName}
                    onChange={(value) => handleFieldChange(setRate1, 'serviceName', value)}
                    autoComplete="off"
                    error={rate1.serviceNameMessage}
                  />
                  <TextField
                    label="Service Code"
                    value={rate1.serviceCode}
                    onChange={(value) => handleFieldChange(setRate1, 'serviceCode', value)}
                    autoComplete="off"
                    error={rate1.serviceCodeMessage}
                  />  
                  <TextField
                    label="Pincodes"
                    value={rate1.pincodes}
                    onChange={(value) => handleFieldChange(setRate1, 'pincodes', value)}
                    multiline={4}
                    autoComplete="off"
                    helpText="Add pincode as comma separeated"
                    error={rate1.pincodesMessage}
                  /> <TextField
                    label="Description"
                    value={rate1.description}
                    onChange={(value) => handleFieldChange(setRate1, 'description', value)}
                    multiline={2}
                    autoComplete="off"
                    error={rate1.description1Change}
                  /> <TextField
                    label="Currency"
                    value={rate1.currency}
                    onChange={(value) => handleFieldChange(setRate1, 'currency', value)}
                    autoComplete="off"
                    error={rate1.currencyMessage}
                  />
                  <TextField
                    label="Price"
                    value={rate1.price}
                    onChange={(value) => handleFieldChange(setRate1, 'price', value)}
                    autoComplete="off"
                    error={rate1.priceMessage}
                  />
                  <Divider/>
                  <Text as="h4" variant="headingMd">
                   Shipping Rates 2
                  </Text>
                  <TextField
                    label="Service Name"
                    value={rate2.serviceName}
                    onChange={(value) => handleFieldChange(setRate2, 'serviceName', value)}
                    autoComplete="off"
                    error={rate2.serviceNameMessage}
                  />
                  <TextField
                    label="Service Code"
                    value={rate2.serviceCode}
                    onChange={(value) => handleFieldChange(setRate2, 'serviceCode', value)}
                    autoComplete="off"
                    error={rate2.serviceCodeMessage}
                  />
                  <TextField
                    label="Pincodes"
                    value={rate2.pincodes}
                    onChange={(value) => handleFieldChange(setRate2, 'pincodes', value)}
                    multiline={4}
                    autoComplete="off"
                    helpText="Add pincode as comma separeated"
                    error={rate2.pincodesMessage}
                  />
                   <TextField
                    label="Description"
                    value={rate2.description}
                    onChange={(value) => handleFieldChange(setRate2, 'description', value)}
                    multiline={2}
                    autoComplete="off"
                    error={rate2.descriptionMessage}
                  />
                  <TextField
                    label="Currency"
                    value={rate2.currency}
                    onChange={(value) => handleFieldChange(setRate2, 'currency', value)}
                    autoComplete="off"
                    error={rate2.currencyMessage}
                  />
                  <TextField
                    label="Price"
                    value={rate2.price}
                    onChange={(value) => handleFieldChange(setRate2, 'price', value)}
                    autoComplete="off"
                    error={rate2.priceMessage}
                  />

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