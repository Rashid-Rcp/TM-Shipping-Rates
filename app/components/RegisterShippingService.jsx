import { useState, useCallback, useEffect, memo } from 'react';
import { Page, Layout, Card, Text, TextField, Button, InlineStack, Divider, BlockStack,Box } from "@shopify/polaris";

const RegisterShippingService = memo(

  function RegisterShippingService({ submit, shipping }) {

    const [name, setName] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [ showDeleteWaring, setShowDeleteWaring ] = useState(false);

    useEffect(() => {
      setName(shipping[0]?.name || '');
      setShowDeleteWaring(false)
    }, [shipping]);

    const registerShipping = () => {
        isValid(name) && submit({ name }, { method: "POST" });
    }

    const updateShipping = () => {
        isValid(name) && submit({ name, id: shipping[0]?.id || null }, { method: "PUT" });
    }

    const deleteShipping = () => {
        submit({ id: shipping[0]?.id || null }, { method: "DELETE" });
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
        return true
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
                  <Button onClick={registerShipping}>
                    Register Shipping
                  </Button>
                ) : (
                  <>
                    <Button onClick={updateShipping}>
                      Update Shipping
                    </Button>
                    <Button tone="critical" onClick={showDeleteConfirm}>
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