const { test, expect, request } = require('@playwright/test');

// Get vendor by ID
test('Get vendor by ID', async ({ request }) => {
  const vendorId = 'Vendor@d0ce717d-6585-4abc-b9d5-2578c80e307c';
  const url = `http://vendor-nlbC3-DmKlF8tZaG86-eeb79be8624f8c82.elb.ap-south-1.amazonaws.com/vendor/${vendorId}`;

  const response = await request.get(url);

  const data = await response.json();
  console.log('Response data:', data);

  expect(response.status()).toBe(200);
});

//create a Vendor

test('Create a new vendor', async ({ request }) => {
  // Define the API endpoint
  const url = 'http://vendor-nlbC3-DmKlF8tZaG86-eeb79be8624f8c82.elb.ap-south-1.amazonaws.com/vendor';

  // Request payload
  const payload = {
    name: "Abhiram Gunji",
    phoneNumber: "7889998989",
    countryCode: "+91",
    contractDocId: "xyz.in",
    contactPersonName: "Abhiram",
    purposes: [
      {
        purposeType: "IA_VERIFICATION",
        scopeType: "CITY",
        scopeName: "MEERUT",
        scopeId: "city@qwe123",
        slaInDays: 4,
        currencyUnit: "INR",
        cost: 750
      },
      {
        purposeType: "CLAIM_VERIFICATION",
        scopeType: "IA",
        scopeId: "Rus@123321",
        scopeName: "Russia Authority",
        slaInDays: 4,
        verificationDepth: "HIGH",
        currencyUnit: "USD",
        cost: 181
      }
    ],
    bankAccount: {
      accountNumber: "90688928",
      accountHolder: "Vipin",
      bankName: "ICICI Bank",
      branchName: "Bengalore",
      ifsc: "QWERTY123",
      swiftCode: "ZXCVB123"
    },
    modeOfPayment: "NEFT",
    paymentFrequency: 122,
    location: {
      country: {
        name: "RUSSIA",
        code: "RU",
        id: "Country@c25a4703-85b5-454a-898b-e7b141a81853"
      },
      state: {
        name: "Serbia"
      },
      city: {
        name: "Moscow"
      },
      address: "ARENA, 12th road, Moscow"
    },
    users: [
      {
        email: "gunjiabhiram+automationvendor1@dataflowgroup.com"
      }
    ]
  };

  const response = await request.post(url, {
    data: payload,
    headers: {
      'Content-Type': 'application/json'
      
    }
  });

  const responseData = await response.json();

  // Log response
  console.log('Response Status:', response.status());
  console.log('Response Data:', JSON.stringify(responseData, null, 2));

  // Basic assertions
  expect(response.status()).toBe(200); // Expected success status for creation

});

