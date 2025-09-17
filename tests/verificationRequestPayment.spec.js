import { test, expect, request as baseRequest } from '@playwright/test';
 
const verificationRequestId = 'VerificationRequest@2eeb141a-4c28-49a4-af2c-4f84af87822f';
//Get Verification request payment by vrid
test('Check verification request payment by ID', async ({ request }) => {
  
  const url = `http://verifi-nlbC3-ZJcAM64tgQPc-6e27e17a311732f9.elb.ap-south-1.amazonaws.com/verification-request-payment/index/${verificationRequestId}`;

  const response = await request.get(url);
  const data = await response.json();
  expect(response.status()).toBe(200);
  console.log('Response data:', JSON.stringify(data, null, 2));

});
// Get verification request by vrid
test('Get Verification Request' , async({ request })=>{
const url= `http://verifi-nlbC3-ZJcAM64tgQPc-6e27e17a311732f9.elb.ap-south-1.amazonaws.com/verification-request/${verificationRequestId}`;
const response = await request.get(url);
const data= await response.json();
  expect(response.status()).toBe(200);
  console.log('Response data:', JSON.stringify(data, null, 2));
});


// update payment status in verification payment
test('Fetch verification request and update payment status to Success', async ({ request }) => {

  // Step 1: Get verification request details
const getUrl = `http://verifi-nlbC3-ZJcAM64tgQPc-6e27e17a311732f9.elb.ap-south-1.amazonaws.com/verification-request-payment/index/${verificationRequestId}`;
  const getResponse = await request.get(getUrl);
  expect(getResponse.status()).toBe(200);

  const getData = await getResponse.json();
  const entity = getData.entities[0];

  const applicantId = entity.applicantId;
  const clientContractId = entity.clientContractId;

  // Step 2: Send PUT request to update payment status
  const putUrl = `http://verifi-nlbC3-ZJcAM64tgQPc-6e27e17a311732f9.elb.ap-south-1.amazonaws.com/verification-request-payment/${verificationRequestId}`;
  const payload = {
    verificationRequestId,
    applicantId,
    clientContractId,
    paymentStatus: "SUCCESS",
    verificationPayments: [],
    verificationRefunds: []
  };

  const putResponse = await request.put(putUrl, {
    data: payload,
    headers: { 
      'Content-Type': 'application/json'
     }
  });

  expect(putResponse.status()).toBe(200);
  const putData = await putResponse.json();

  console.log('Update Response:', JSON.stringify(putData, null, 2));
});


//Update verification request payment contract

test('Update all payment contracts to SUCCESS', async ({ request }) => {
  // Step 1: Fetch verification request payment
  const fetchUrl = `http://verifi-nlbC3-ZJcAM64tgQPc-6e27e17a311732f9.elb.ap-south-1.amazonaws.com/verification-request-payment/index/${verificationRequestId}`;
  const fetchResponse = await request.get(fetchUrl);
  expect(fetchResponse.status()).toBe(200);

  const fetchData = await fetchResponse.json();
  const contracts = fetchData.entities?.[0]?.verificationPayments || [];

  if (contracts.length === 0) {
    throw new Error('No payment contracts found.');
  }

  // Step 2: Loop through and update each contract
  for (const contractId of contracts) {
    const updateUrl = `http://core-v-nlbC3-EmpzER75MymP-5b97586e7721ae60.elb.ap-south-1.amazonaws.com/verification-request-payment-contracts/${contractId}/?updateType=ADD`;

    const updateResponse = await request.put(updateUrl, {
      data: {
        paymentStatus: 'SUCCESS'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    expect(updateResponse.status()).toBe(200);
    const updateData = await updateResponse.json();
    console.log(`Updated ${contractId}:`, updateData.message);
  }
});

// prevalidity Integrity check

test('Trigger pre-validation-integrity-check API', async () => {
  const request = await baseRequest.newContext();
    const url = `http://verifi-nlbC3-ZJcAM64tgQPc-6e27e17a311732f9.elb.ap-south-1.amazonaws.com/verification-request/${verificationRequestId}/pre-validation-integrity-check`;
    const response = await request.fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  expect(response.status()).toBe(200);
  console.log('✅ pre-validation-integrity-check triggered successfully');
});

