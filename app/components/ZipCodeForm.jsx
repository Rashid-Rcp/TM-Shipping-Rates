import { TextField, Checkbox} from "@shopify/polaris";
import { useCallback,memo } from 'react';

const ZipCodeForm = memo(({setRate, rates}) => {

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
        
        switch(fieldName) {
            case 'phoneRequired':
                return { isValid, message };
    
            case 'minDeliveryDays':
            case 'maxDeliveryDays':
                if (newValue !== '' && newValue < 1) {
                    isValid = false;
                    message = "Delivery days must be a positive number";
                }
                break;
    
            case 'price':
                if (newValue < 0) {
                    message = 'Price must be greater than or equal to 0';
                    isValid = false;
                }
                break;
    
            case 'currency':
                if (!isValidCurrencyCode(newValue.trim())) {
                    message = 'Invalid currency code';
                    isValid = false;
                }
                break;
    
            default:
                if (newValue.trim() === '') {
                    message = `${fieldName} can't be empty`;
                    isValid = false;
                }
        }
    
        return { isValid, message };
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
          error={rates.descriptionMessage}
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
);
export default ZipCodeForm;