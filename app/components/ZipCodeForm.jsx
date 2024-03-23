import { TextField, Checkbox} from "@shopify/polaris";
import { useCallback } from 'react';

export default function ZipCodeForm({setRate, rates}) {

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
  
    if(fieldName === 'phoneRequired'){
      return { isValid:isValid, message:message}
    }
    
    if((fieldName === 'minDeliveryDays' || fieldName === 'maxDeliveryDays') ){
        if(newValue !== '' && newValue < 1 ){
          isValid = false;
          message = "Delivery days must be a positive number";
        }
    }
    else if (newValue.trim() === '') {
      message = `${fieldName} can't be empty`;
      isValid = false;
    } else if (fieldName === 'price' && newValue < 0) {
      message = 'Price must be greater than or equal to 0';
      isValid = false;
    } else if (fieldName === 'currency' && !isValidCurrencyCode(newValue.trim())) {
      message = 'Invalid currency code';
      isValid = false;
    }
  
    return { isValid:isValid, message:message };
  };

  const isValidCurrencyCode = (currencyCode) => {
    const currencyCodeRegex = /^[A-Z]{3}$/;
    return currencyCodeRegex.test(currencyCode);
  };

  return (
    <>
      <TextField
        label="Service Name"
        value={rates.serviceName}
        onChange={(value) => handleFieldChange(setRate, 'serviceName', value)}
        autoComplete="off"
        error={rates.serviceNameMessage}
      />
      <TextField
        label="Service Code"
        value={rates.serviceCode}
        onChange={(value) => handleFieldChange(setRate, 'serviceCode', value)}
        autoComplete="off"
        error={rates.serviceCodeMessage}
      />  
      <TextField
        label="Pincodes"
        value={rates.pincodes}
        onChange={(value) => handleFieldChange(setRate, 'pincodes', value)}
        multiline={4}
        autoComplete="off"
        helpText="Add pincode as comma separeated"
        error={rates.pincodesMessage}
      /> <TextField
        label="Description"
        value={rates.description}
        onChange={(value) => handleFieldChange(setRate, 'description', value)}
        multiline={2}
        autoComplete="off"
        error={rates.description1Change}
      /> <TextField
        label="Currency"
        value={rates.currency}
        onChange={(value) => handleFieldChange(setRate, 'currency', value)}
        autoComplete="off"
        error={rates.currencyMessage}
      />
      <TextField
        label="Price"
        type="number"
        value={rates.price}
        onChange={(value) => handleFieldChange(setRate, 'price', value)}
        autoComplete="off"
        error={rates.priceMessage}
      />
      
    <TextField
        label="Min Delivery Days"
        type="number"
        value={rates.minDeliveryDays}
        onChange={(value) => handleFieldChange(setRate, 'minDeliveryDays', value)}
        autoComplete="off"
        error={rates.minDeliveryDaysMessage}
        helpText="This field is optional"
      />
    <TextField
        label="Max Delivery Days"
        type="number"
        value={rates.maxDeliveryDays}
        onChange={(value) => handleFieldChange(setRate, 'maxDeliveryDays', value)}
        autoComplete="off"
        error={rates.maxDeliveryDaysMessage}
        helpText="This field is optional"
      />
    <Checkbox
      label="Is phone number required?"
      checked={rates.phoneRequired}
      onChange={(newChecked) => handleFieldChange(setRate, 'phoneRequired', newChecked)}
      helpText="This field is optional"
    />
   </>   
  );
}