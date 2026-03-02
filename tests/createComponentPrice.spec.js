
import { test, expect } from '@playwright/test';

test('Create verification prices for Components', async ({ request }) => {

  const baseUrl = 'http://nginx--nlbC3-sn7vKMsxDDMK-3360319dfff3cca3.elb.eu-west-1.amazonaws.com';

  // 🔹 Client Contracts
  const clientContractIds = [
'ClientContract@4b82d6db-d356-4b3e-8c4c-62f61bd8e48e',
'ClientContract@49cc6d61-a261-402e-995b-c9a5d3229b6d',
'ClientContract@ce618a5e-b8c2-42f0-a4f7-0988341feed7',
'ClientContract@0fec1f21-0546-4d2d-9ef6-82ac6779d187',
'ClientContract@ad10bb32-65d6-41ac-acef-ecea2bc32c85',
'ClientContract@85b7fa3b-2e8a-4188-8c13-5d812bb5b5b1',
'ClientContract@7bd2f4bd-e904-4565-862a-b87deb89e30e',
'ClientContract@fac8d1d6-de93-4a66-bd6c-dfec45d0097c',
'ClientContract@fef87339-9c09-48ac-ae50-a73bd7d1d1e8',
'ClientContract@cc56faf6-bfc9-46f5-bce5-7c09d6693d6c',
'ClientContract@dfaadad8-9e6a-45f1-92c6-6eb1acc083c8',
'ClientContract@2a948e30-92c3-4509-a5f9-70ca8d8b2384'
];

  // 🔹 Component Types with Prices
  const componentPrices = {
    'ComponentType@employment': 500,
    'ComponentType@collegeEducation': 500,
    'ComponentType@license': 500,
    'ComponentType@riskDataset': 0,
    'ComponentType@specialization': 500,
    'ComponentType@academicPerformance': 500,
    'ComponentType@goodStanding': 500,
    'ComponentType@internship': 500,
    'ComponentType@training': 500,
    'ComponentType@membership': 500

  };

  for (const contractId of clientContractIds) {

    console.log(`\n🔹 Processing Contract: ${contractId}`);

    for (const componentTypeId of Object.keys(componentPrices)) {

      const amount = componentPrices[componentTypeId];

      console.log(`   ➜ Creating price for ${componentTypeId} (${amount} SAR)`);

      const response = await request.post(
        `${baseUrl}/client-contract-service/verification-price`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            componentTypeId,
            contractId,
            priceInfo: {
              amount,
              currency: {
                code: "SAR",
                symbol: "SAR",
                name: "SAR"
              }
            }
          }
        }
      );

      const status = response.status();

      if (status === 400) {
        console.log(`   ⚠️ Price already exists. Skipping...`);
        continue; // Skip and move to next component
      }

      if (![200, 201].includes(status)) {
        const errorBody = await response.text();
        console.log(`   ❌ Failed with status ${status}`);
        console.log(`   Response: ${errorBody}`);
        throw new Error(`Failed for ${contractId} - ${componentTypeId}`);
      }

      console.log(`   ✅ Price created successfully`);
    }
  }

  console.log('\n🎉 All verification prices processed successfully');
});