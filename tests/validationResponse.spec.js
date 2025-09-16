import { expect, test } from "@playwright/test";

test('POST validation response based on componentTypeId', async ({ request }) => {
  // Step 1: Get the VR by ID
  const vrRes = await request.get('http://verifi-nlbC3-n2OMroH9cKeE-92f8f4467dd39713.elb.ap-south-1.amazonaws.com/workflow/NDOH-250916-04700');
  expect(vrRes.status()).toBe(200);
  const vrJson = await vrRes.json();
  const verificationRequestId = vrJson.entities[0].resourceEntityId;

  // Step 2: Post to verification-request-response
  const postBody = {
    internalOpsUserId: "OpsUser@c1ab025d-c52c-405c-b2a4-d8b5fbcdfb99",
    owner: "User@1944b4ae-c9c2-486b-a557-779b9346dbde",
    reviewComments: [
      {
        additionalRemark: null,
        attributeName: "LOA",
        decision: "CORRECT",
        entityId: "UserConsent@8b594e74-8192-4428-b85a-764326927412",
        entityName: "UserConsent",
        isCaseLevelIssue: true,
        remark: null,
        type: "LOA"
      }
    ],
    state: "DRAFT",
    verificationRequestId: verificationRequestId 
  };

  const postResponse = await request.post(
    'http://verifi-nlbC3-fdG3aGSbkH7t-b99f8e0e7ddd5c6b.elb.ap-south-1.amazonaws.com/verification-request-response',
    {
      headers: {
        'Content-Type': 'application/json'
      },
      data: postBody
    }
  );

  expect(postResponse.status()).toBe(200); // Or whatever the expected status code is
  const postJson = await postResponse.json();
  console.log("POST Response:", JSON.stringify(postJson, null, 2));


  // Step 3: Get all claim items
  const claimRes = await request.get(`http://verifi-nlbC3-fdG3aGSbkH7t-b99f8e0e7ddd5c6b.elb.ap-south-1.amazonaws.com/claim-items?verificationRequestId=${verificationRequestId}`);
  expect(claimRes.status()).toBe(200);
  const claimItems = (await claimRes.json()).entities;

  // Step 4: Loop and act based on componentTypeId
  for (const item of claimItems) {
    const { componentTypeId, alternateID } = item;

    if (componentTypeId === "ComponentType@identityBasicDetails") {
      const identityPayload = {
        claimItemId: alternateID,
        internalOpsUserId: "OpsUser@c1ab025d-c52c-405c-b2a4-d8b5fbcdfb99",
        owner: "User@1944b4ae-c9c2-486b-a557-779b9346dbde",
        state: "DRAFT",
        reviewComments: [
          {
            attributeName: "Document",
            decision: "CORRECT",
            entityId: "ApplicantDocument@527a341f-1bef-40d0-8b53-36a02e9092b0",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: "Yes" },
            type: "VALIDATION"
          },
          {
            attributeName: "First Name (as per document)",
            decision: "CORRECT",
            entityId: "Attribute@ddcee18c-400d-483e-8b6a-a22f755f64c2",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "Last Name (as per document)",
            decision: "CORRECT",
            entityId: "Attribute@dfa61d33-a29f-42d5-a76b-79eee214b773",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "Nationality",
            decision: "CORRECT",
            entityId: "Attribute@c9110b97-e76b-44c1-b6ea-3b12f1af23d7",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "Date Of Birth",
            decision: "CORRECT",
            entityId: "Attribute@26cd4c9b-1d62-4aac-94d0-fb679aed7665",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "Gender (as per document)",
            decision: "CORRECT",
            entityId: "Attribute@b152a93f-fb22-4c5d-95aa-cb34ee913c06",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: "Female" },
            type: "VALIDATION"
          },
          {
            attributeName: "ID Number",
            decision: "CORRECT",
            entityId: "Attribute@b0a9065b-9126-4d53-902e-a0328c42d031",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "Issued Date",
            decision: "CORRECT",
            entityId: "Attribute@20d337eb-261f-47a2-8a94-39dbb8f7ca20",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "Date of Expiry",
            decision: "CORRECT",
            entityId: "Attribute@6446588a-ff7c-4891-8d1e-126edad38b09",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          }
        ]
      };

      const identityPostRes = await request.post(
        'http://verifi-nlbC3-fdG3aGSbkH7t-b99f8e0e7ddd5c6b.elb.ap-south-1.amazonaws.com/validation-response',
        {
          headers: { 'Content-Type': 'application/json' },
          data: identityPayload
        }
      );

      console.log(`Posted identity validation for ${alternateID}, status: ${identityPostRes.status()}`);
      console.log(await identityPostRes.json());
      expect(identityPostRes.status()).toBe(200);

    } else if (componentTypeId === "ComponentType@collegeEducation") {
      const educationPayload = {
        claimItemId: alternateID,
        internalOpsUserId: "OpsUser@c1ab025d-c52c-405c-b2a4-d8b5fbcdfb99",
        owner: "User@1944b4ae-c9c2-486b-a557-779b9346dbde",
        state: "DRAFT",
        reviewComments: [
          {
            attributeName: "Document",
            decision: "CORRECT",
            entityId: "ApplicantDocument@9885cdb5-49bf-4590-bd23-640108636ff7",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: "Yes" },
            type: "VALIDATION"
          },
          {
            attributeName: "College / Institution Name",
            decision: "CORRECT",
            entityId: "Attribute@08b3f73d-75d8-407d-be45-3d94abc89042",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "Degree Level",
            decision: "CORRECT",
            entityId: "Attribute@5554fc2b-8e8b-4e67-b450-6d7bf9b01aac",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: "Bachelors" },
            type: "VALIDATION"
          },
          {
            attributeName: "Department / Faculty name",
            decision: "CORRECT",
            entityId: "Attribute@6496ae64-9a1e-40cc-a722-0fe3483d452c",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: "CSE" },
            type: "VALIDATION"
          },
          {
            attributeName: "Course / Degree Name (Full Name, No Abbreviations)",
            decision: "CORRECT",
            entityId: "Attribute@e8179160-0777-49f1-a67a-a339b1825f30",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: "BE" },
            type: "VALIDATION"
          },
          {
            attributeName: "Program Duration (in years)",
            decision: "CORRECT",
            entityId: "Attribute@49d80405-426d-4c94-b068-07749af4fd67",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "Mode of Study",
            decision: "CORRECT",
            entityId: "Attribute@e7c7d7a8-7e25-429f-8b3e-0977fa6faa74",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: "Active Enrollment" },
            type: "VALIDATION"
          },
          {
            attributeName: "Start Date",
            decision: "CORRECT",
            entityId: "Attribute@f00d5113-e5a6-400c-8fd2-4f88a68a13ac",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "End / Graduation Date",
            decision: "CORRECT",
            entityId: "Attribute@6876f362-0f30-4e5e-851e-8ebaab321d70",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "First Name (as per document)",
            decision: "CORRECT",
            entityId: "Attribute@2f97f52d-e1e2-4eb7-8da4-c8cb8e3bb262",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "Middle Name (as per document)",
            decision: "CORRECT",
            entityId: "Attribute@9a55e8ee-1d28-4bd4-b34b-3a990ca69f7e",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "Last Name (as per document)",
            decision: "CORRECT",
            entityId: "Attribute@6deae316-a0a5-4729-ac5f-80f9e28ab307",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "Transcript",
            decision: "CORRECT",
            entityId: "IssuingAuthorityDocument@43270a31-b214-47ef-8e49-4325037fae36",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: null },
            type: "VALIDATION"
          },
          {
            attributeName: "University Name",
            decision: "CORRECT",
            entityId: "Attribute@37ba7795-aa15-44bb-a610-6deae9ef8487",
            entityName: "ClaimItem",
            isCaseLevelIssue: false,
            metaData: { snapshot: "Karthik Medical University" },
            type: "VALIDATION"
          }
        ]
      };

      const eduPostRes = await request.post(
        'http://verifi-nlbC3-fdG3aGSbkH7t-b99f8e0e7ddd5c6b.elb.ap-south-1.amazonaws.com/validation-response',
        {
          headers: { 'Content-Type': 'application/json' },
          data: educationPayload
        }
      );

      console.log(`Posted college education validation for ${alternateID}, status: ${eduPostRes.status()}`);
      console.log(await eduPostRes.json());
      expect(eduPostRes.status()).toBe(200);
    }
  }
  // Extract verification request response  ID from the POST response
const verificationRequestResponseId = postJson.entities[0].id;

// Step 3: PUT request to update state to CLOSED
const updateResponse = await request.put(
  `http://verifi-nlbC3-fdG3aGSbkH7t-b99f8e0e7ddd5c6b.elb.ap-south-1.amazonaws.com/verification-request-response/${verificationRequestResponseId}`,
  {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      internalOpsUserId: "OpsUser@c1ab025d-c52c-405c-b2a4-d8b5fbcdfb99",
      owner: "User@1944b4ae-c9c2-486b-a557-779b9346dbde",
      reviewComments: [
        {
          additionalRemark: null,
          attributeName: "LOA",
          decision: "CORRECT",
          entityId: "UserConsent@8b594e74-8192-4428-b85a-764326927412",
          entityName: "UserConsent",
          isCaseLevelIssue: true,
          remark: null,
          type: "LOA"
        }
      ],
      state: "CLOSED"
    }
  }
);

console.log(`PUT update status: ${updateResponse.status()}`);
console.log("PUT Response:", await updateResponse.json());
expect(updateResponse.status()).toBe(200);




});
