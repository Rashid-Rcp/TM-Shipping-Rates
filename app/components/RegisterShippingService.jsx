import { useState, useCallback, useEffect, memo } from 'react';
import { Layout, Card, Text, TextField, Button, InlineStack, BlockStack,Box } from "@shopify/polaris";
import { useNavigation } from "@remix-run/react";

const RegisterShippingService = memo(

  function RegisterShippingService({ submit, shipping }) {
    const nav = useNavigation();
    const [name, setName] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [ showDeleteWaring, setShowDeleteWaring ] = useState(false);
    const [loadingAction, setLoadignAction] = useState('');

    useEffect(() => {
      setName(shipping[0]?.name || '');
      setShowDeleteWaring(false)
    }, [shipping]);

    useEffect(()=>{
      nav.state === 'idle' && setLoadignAction('');
    },[nav]);

    const registerShipping = () => {

        if(isValid(name)){
          submit({ name }, { method: "POST" });
          setLoadignAction('register');
        } 
    }

    const updateShipping = () => {
        if(isValid(name)){
          submit({ name, id: shipping[0]?.id || null }, { method: "PUT" });
          setLoadignAction('update');
        } 
    }

    const deleteShipping = () => {
        submit({ id: shipping[0]?.id || null }, { method: "DELETE" });
        setLoadignAction('delete');
    }

    const showDeleteConfirm = () => {
        setShowDeleteWaring(true);
    }

    const hideDeleteConfirm = () => {
        setShowDeleteWaring(false);
    }

    const isValid = (name)=>{
        if(name.trim() === ''){
            setValidationMessage('Shipping service name cant be empty');
            return false;
        }
        return true;
    }

    const handleChange = useCallback(
      (newValue) => {
        if(newValue.trim() === ''){
            setValidationMessage('Shipping service name cant be empty');
        }
        else{
            setValidationMessage('');
        }
        setName(newValue)
        },
      [],
    );

    return (

      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="500">
              <Text as="h1" variant="headingMd">Register Shipping Services</Text>
              <TextField
                label="Name"
                value={name}
                autoComplete="off"
                onChange={handleChange}
                error={validationMessage}
              />
              <InlineStack gap="400">
                {shipping.length === 0 ? (
                  <Button 
                    onClick={registerShipping}
                    loading = {loadingAction === 'register'}
                  >
                    Register Shipping
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={updateShipping}
                      loading= {loadingAction === 'update'}
                    >
                      Update Shipping
                    </Button>
                    <Button 
                      tone="critical" 
                      onClick={showDeleteConfirm}
                      loading={loadingAction === 'delete'}
                    >
                      Delete Shipping
                    </Button>
                  </>
                )}
              </InlineStack>
             { showDeleteWaring && (<DeleteWarning deleteShipping={deleteShipping} cancel={hideDeleteConfirm}/>) } 
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    );
  }
);
export default RegisterShippingService;

const DeleteWarning = ({deleteShipping, cancel})=>{

    return (
        <div style={{background:'#fbd7d7',padding:'20px'}}>
            <Box>
                <Layout>
                    <Layout.Section>
                        <BlockStack gap="500">
                            <Text as="h3">Are you sure to delete? </Text> 
                            <Text as="p">It will remove all the related data.</Text> 
                            <InlineStack gap="400">
                                <Button tone="critical" onClick={deleteShipping}>Confirm Delete</Button>
                                <Button onClick={cancel}>Cancel</Button>
                            </InlineStack>
                        </BlockStack>
                    </Layout.Section>
                </Layout>
            </Box>
        </div>
    )
}