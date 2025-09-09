import { test, expect } from '@playwright/test';
import readline from 'readline';

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans.trim());
  }));
}

test('update usergroups dynamically based on user input', async ({ request }) => {
  const putUrl = 'http://user-s-nlbC3-srcrLynLyeVt-045da1d9d623053f.elb.ap-south-1.amazonaws.com/users/User@1944b4ae-c9c2-486b-a557-779b9346dbde';

  // Prompt the user in the terminal
  const userInput = await askQuestion(
    `Enter user group to update (validation, verification, verificationqc, reportqc, iacreation, iaapproval, accreditation, accreditationapproval): `
  );

  const userGroupsMap = {
    validation: [
      "USERGROUP_OPS_PERFORMER",
      "USERGROUP_COMMON",
      "USERGROUP_VALIDATION",
      "USERGROUP_OPS_USER"
    ],
    verification: [
      "USERGROUP_OPS_PERFORMER",
      "USERGROUP_COMMON",
      "USERGROUP_VERIFICATION",
      "USERGROUP_OPS_USER"
    ],
    verificationqc: [
      "USERGROUP_OPS_PERFORMER",
      "USERGROUP_COMMON",
      "USERGROUP_COMPONENT_QC",
      "USERGROUP_OPS_USER"
    ],
    reportqc: [
      "USERGROUP_OPS_PERFORMER",
      "USERGROUP_COMMON",
      "USERGROUP_MANAGEMENT",
      "USERGROUP_COMPONENT_QC",
      "USERGROUP_OPS_USER"
    ],
    iacreation: [
      "USERGROUP_OPS_PERFORMER",
      "USERGROUP_COMMON",
      "USERGROUP_IA_RESEARCH",
      "USERGROUP_OPS_USER"
    ],
    iaapproval: [
      "USERGROUP_OPS_PERFORMER",
      "USERGROUP_COMMON",
      "USERGROUP_IA_APPROVER",
      "USERGROUP_OPS_USER"
    ],
    accreditation: [
      "USERGROUP_OPS_PERFORMER",
      "USERGROUP_COMMON",
      "USERGROUP_IA_ACCREDITATION_RESEARCH",
      "USERGROUP_OPS_USER"
    ],
    accreditationapproval: [
      "USERGROUP_OPS_PERFORMER",
      "USERGROUP_COMMON",
      "USERGROUP_IA_ACCREDITATION_APPROVAL",
      "USERGROUP_OPS_USER"
    ]
  };

  if (!userInput) {
    console.log('No input provided. Skipping userGroups update.');
    return;
  }

  const userGroupsToUpdate = userGroupsMap[userInput.toLowerCase()];
  if (!userGroupsToUpdate) {
    throw new Error(`Invalid input "${userInput}". Please enter a valid user group key.`);
  }

  const putResponse = await request.put(putUrl, {
    headers: { 'Content-Type': 'application/json' },
    data: {
      userGroups: userGroupsToUpdate,
    },
  });

  expect(putResponse.status()).toBe(200);

  const putData = await putResponse.json();
  console.log('Update Response:', JSON.stringify(putData, null, 2));
});
