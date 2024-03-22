// RegisterShippingService.jsx

import React, { useState, useCallback, useEffect } from 'react';
import { Page, Layout, Card, Text, TextField, Button, InlineStack,BlockStack, Divider } from "@shopify/polaris";
export default function AddZipCode(props) {
  const{ shop, rates, submit } = props;

  console.log('AddZipCode');
  console.log(rates);
  const [rate1, setRate1] = useState(null);
  const [price1, setPrice1] = useState('');
  const[rate1Id, setRate1Id] = useState('');

  useEffect(()=>{

    rates && setRate1(rates[0]);

  },[rates])

  useEffect(()=>{
    //setPrice1(rate1?rate1.total_price:'');
    setRate1Id(rate1?rate1.id:'');
  },[rate1])

  //const rate1 = rates ? (rates[0] ?? null) : null;
  // const rate2 = rates ? (rates[1] ?? null) : null;
  // const rate1_pincodes = rates? rates[0].pincodes.map(pin => pin.pincode).join(','): '';
  // const rate2_pincodes = rates? rates[1].pincodes.map(pin => pin.pincode).join(','): '';
  // const [isChanged, setIsChanged] =  useState(false);

  // const [serviceName1, setServiceName1] = useState(rate1?rate1.service_name:'');
  // const [serviceCode1, setServiceCode1] = useState(rate1?rate1.service_code:'');
  // const [pincodes1, setPincode1] = useState(rate1_pincodes);
  // const [description1, setDescription1] = useState(rate1?rate1.description:'');
  // const [currency1, setCurrency1] = useState(rate1?rate1.currency:shop.data[0].currency);


  // const [serviceName1Validation, setServiceName1Validation] = useState('');
  // const [serviceCode1Validation, setServiceCode1Validation] = useState('');
  // const [pincodes1Validation, setPincode1Validation] = useState('');
  // const [description1Validation, setDescription1Validation] = useState('');
  // const [price1Validation, setPrice1Validation] = useState('');

  // const [serviceName2, setServiceName2] = useState(rate2?rate2.service_name:'');
  // const [serviceCode2, setServiceCode2] = useState(rate2?rate2.service_code:'');
  // const [pincodes2, setPincode2] = useState(rate2_pincodes);
  // const [description2, setDescription2] = useState(rate2?rate2.description:'');
  // const [currency2, setCurrency2] = useState(rate2?rate2.currency:shop.data[0].currency);
  // const [price2, setPrice2] = useState(rate2?rate2.total_price:'');
  // const[rate2Id, setRate2Id] = useState(rate2?rate2.id:'');

  // const [serviceName2Validation, setServiceName2Validation] = useState('');
  // const [serviceCode2Validation, setServiceCode2Validation] = useState('');
  // const [pincodes2Validation, setPincode2Validation] = useState('');
  // const [description2Validation, setDescription2Validation] = useState('');
  // const [price2Validation, setPrice2Validation] = useState('');

  // const [isValid, setIsValid] =  useState(true);
  // const [formInvalidMessage, setFormInvalidMessage] = useState('');

  // const serviceName1Change = useCallback(
  //   (value) => {
  //     if(value.trim() === ''){
  //       setServiceName1Validation('Service name cannot be empty');
  //       setIsValid(false);
  //     }
  //     else{
  //       setServiceName1Validation('');
  //       setIsValid(true);
  //     }
  //     setServiceName1(value);
  //     setIsChanged(true);
  //   },
  //   [],
  // );

  // const serviceCode1Change = useCallback(
  //   (value) => {
  //     if(value.trim() === ''){
  //       setServiceCode1Validation('Service code cannot be empty');
  //       setIsValid(false);
  //     }
  //     else{
  //       setServiceCode1Validation('');
  //       setIsValid(true);
  //     }
  //     setServiceCode1(value);
  //     setIsChanged(true);
  //   },
  //   [],
  // );

  // const pincode1Change = useCallback(
  //   (value) => {
  //     if(value.trim() === ''){
  //       setPincode1Validation('Pincodes cannot be empty');
  //       setIsValid(false);
  //     }
  //     else{
  //       setPincode1Validation('');
  //       setIsValid(false);
  //     }
  //     setPincode1(value);
  //     setIsChanged(true);
  //   },
  //   [],
  // );

  // const description1Change = useCallback(
  //   (value) => {
  //     if(value.trim() === ''){
  //       setDescription1Validation('Description cannot be empty');
  //       setIsValid(false);
  //     }
  //     else{
  //       setDescription1Validation('');
  //       setIsValid(true);
  //     }
  //     setDescription1(value);
  //     setIsChanged(true);
  //   },
  //   [],
  // );

  // const price1Change = useCallback(
  //   (value) => {
  //     if(value.trim() === ''){
  //       setPrice1Validation('Price cannot be empty');
  //       setIsValid(false);
  //     }
  //     else if(isNaN(value.trim())){
  //       setPrice1Validation('Price must be in number');
  //       setIsValid(false);
  //     }
  //     else{
  //       setPrice1Validation('');
  //       setIsValid(true);
  //     }
  //     setPrice1(value);
  //     setIsChanged(true);
  //   },
  //   [],
  // );

  const price1Change2 = (event) => {
    const value = event.target.value; // Get the value from the event object
  
    // if (value.trim() === '') {
    //   setPrice1Validation('Price cannot be empty');
    //   setIsValid(false);
    // } else if (isNaN(value.trim())) {
    //   setPrice1Validation('Price must be a number');
    //   setIsValid(false);
    // } else {
    //   setPrice1Validation('');
    //   setIsValid(true);
    // }
  
    setPrice1(value);
    //setIsChanged(true);
  };


  // const serviceName2Change = useCallback(
  //   (value) => {
  //     if(value.trim() === ''){
  //       setServiceName2Validation('Service name cannot be empty');
  //       setIsValid(false);
  //     }
  //     else{
  //       setServiceName2Validation('');
  //       setIsValid(true);
  //     }
  //     setServiceName2(value);
  //     setIsChanged(true);
  //   },
  //   [],
  // );

  // const serviceCode2Change = useCallback(
  //   (value) => {
  //     if(value.trim() === ''){
  //       setServiceCode2Validation('Service code cannot be empty');
  //       setIsValid(false);
  //     }
  //     else{
  //       setServiceCode2Validation('');
  //       setIsValid(true);
  //     }
  //     setServiceCode2(value);
  //     setIsChanged(true);
  //   },
  //   [],
  // );

  // const pincode2Change = useCallback(
  //   (value) => {
  //     if(value.trim() === ''){
  //       setPincode2Validation('Pincodes cannot be empty');
  //       setIsValid(false);
  //     }
  //     else{
  //       setPincode2Validation('');
  //       setIsValid(true);
  //     }
  //     setPincode2(value);
  //     setIsChanged(true);
  //   },
  //   [],
  // );

  // const description2Change = useCallback(
  //   (value) => {
  //     if(value.trim() === ''){
  //       setDescription2Validation('Description cannot be empty');
  //       setIsValid(false);
  //     }
  //     else{
  //       setDescription2Validation('');
  //       setIsValid(true);
  //     }
  //     setDescription2(value);
  //     setIsChanged(true);
  //   },
  //   [],
  // );

  // const price2Change = useCallback(
  //   (value) => {
  //     if(value.trim() === ''){
  //       setPrice2Validation('Price cannot be empty');
  //       setIsValid(false);
  //     }
  //     else if(isNaN(value.trim())){
  //       setPrice2Validation('Price must be in number');
  //       setIsValid(false);
  //     }
  //     else{
  //       setPrice2Validation('');
  //       setIsValid(true);
  //     }
  //     setPrice2(value);
  //     setIsChanged(true);
  //   },
  //   [],
  // );

  const updateShippingRates = ()=>{

    // const isValid = doFormValidation();
    // if(!isValid){
    //   setFormInvalidMessage('Please fill the requried filed with valid inputs');
    //   setTimeout(function(){
    //     setFormInvalidMessage('');
    //   },3000);
    //   return false;
    // }

    const rate1 = {
      'id':rate1Id,
      //'service_name' : serviceName1,
     // 'service_code': serviceCode1,
     // 'description': description1,
     // 'currency': currency1,
     // 'pincodes': pincodes1,
      'total_price': price1
    }

    // const rate2 = {
    //   'id':rate2Id,
    //   'service_name' : serviceName2,
    //   'service_code': serviceCode2,
    //   'description': description2,
    //   'currency': currency2,
    //   'pincodes': pincodes2,
    //   'total_price': price2
    // }

    submit({ rate1: JSON.stringify(rate1), action:'update_rates' }, { replace: true, method: "POST" })

  };


  // const doFormValidation = () => {
  //   let isValid = true;
  
  //   if (serviceName1 === '' || serviceName1Validation !== '' ||
  //       serviceCode1 === '' || serviceCode1Validation !== '' ||
  //       description1 === '' || description1Validation !== '' ||
  //       pincodes1 === '' || pincodes1Validation !== '' ||
  //       price1 === '' || price1Validation !== '' ||
  //       serviceName2 === '' || serviceName2Validation !== '' ||
  //       serviceCode2 === '' || serviceCode2Validation !== '' ||
  //       description2 === '' || description2Validation !== '' ||
  //       pincodes2 === '' || pincodes2Validation !== '' ||
  //       price2 === '' || price2Validation !== '') {
  //     isValid = false;
  //   }  
  //   return isValid;
  // }

  return (
    <>

    {/* <TextField
      label="Price"
      value={price1}
      onChange={price1Change}
      autoComplete="off"
      //error={price1Validation}
    /> */}
    <input type='text' value={price1} onChange={price1Change2} />

    <InlineStack gap="300">
      <Button onClick={updateShippingRates}>
        Update Shipping Rates
      </Button>
    </InlineStack>

    </>
  );
}
