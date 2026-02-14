const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');


// Define the API endpoint and the request body
const IA_API_URL = 'http://ia-ser-nlbC3-5sBlw1AQjb2o-a32d6f1ddbaed59b.elb.ap-south-1.amazonaws.com/issuing-authority';
const IA_OFFICE_API_URL = 'http://ia-ser-nlbC3-5sBlw1AQjb2o-a32d6f1ddbaed59b.elb.ap-south-1.amazonaws.com/issuing-authority-office';
const IAVD_API_URL = 'http://ia-ser-nlbC3-5sBlw1AQjb2o-a32d6f1ddbaed59b.elb.ap-south-1.amazonaws.com/issuing-authority-verification-details';
const IA_COMPONENTS_API_URL = 'http://ia-ser-nlbC3-5sBlw1AQjb2o-a32d6f1ddbaed59b.elb.ap-south-1.amazonaws.com/issuing-authority-issuing-components'
const IA_COURSE_URL = 'http://ia-ser-nlbC3-5sBlw1AQjb2o-a32d6f1ddbaed59b.elb.ap-south-1.amazonaws.com/issuing-authority-degree-offered'
const IA_VERIFIER_URL = 'http://ia-ser-nlbC3-5sBlw1AQjb2o-a32d6f1ddbaed59b.elb.ap-south-1.amazonaws.com/issuing-authority-verifier-details'
const randomString1 = faker.string.alphanumeric(6);
const dynamicIAName = `QA-${randomString1}`;
const REQUEST_BODY = {
    "name": dynamicIAName,
    "iaStatus": "ADDED",
    "website": "http://www.google.com",
    "language": "English",
    "verificationState": "ACCREDITATION_COMPLETED",
    "valdity": "ACCREDITED",
    "opsId": "OpsUser@jagadeep_staging"
};


test('Create a new issuing authority', async ({ request }) => {
    // Send a POST request to the API
    const iaResponse = await request.post(IA_API_URL, {
        data: REQUEST_BODY,
        headers: {
            'Content-Type': 'application/json'
        }
       
    });


    expect(iaResponse.status()).toBe(200);
    const parsedIaResponse = await iaResponse.json();
    console.log(parsedIaResponse);


    const issuingAuthorityId = parsedIaResponse.entities[0].id;


    const IA_OFFICE_REQUEST_BODY = {
        "issuingAuthorityId": issuingAuthorityId,
        "latLng": {
            "lat": 41.7128,
            "lng": 89.0060
        },
        "line1": "VTP",
        "line2": "Apt 456",
        "subLocality": "denver",
        "locality": "Cityville",
        "city": "Metropolis",
        "zip": "560102",
        "state": "Stateville",
        "country": "Countryland",
        "isAccreditationRequired": "Yes",
        "verificationState": "ACCREDITATION_COMPLETED",
        "validity": "ACCREDITATED",
        "opsId": "OpsUser@jagadeep_staging"
    };


    const iaOfficeResponse = await request.post(IA_OFFICE_API_URL,{
        data: IA_OFFICE_REQUEST_BODY,
        headers: {
            'content-Type': 'application/json'
        }
    })


    expect(iaOfficeResponse.status()).toBe(200);
    const parsedIaOfficeResponse = await iaOfficeResponse.json();
    console.log(parsedIaOfficeResponse);


    const issuingAuthorityOfficeId = parsedIaOfficeResponse.entities[0].id;


    const IAVD_REQUEST_BODY = {
        "issuingAuthorityId": issuingAuthorityId,
        "officeId": issuingAuthorityOfficeId,
        "evidence": "MEDIA",
        "source": "WEB",
        "existenceStatus":"EXIST",
        "websiteUrl" : "www.jagadeep.com",
        "fileProof":
        [
            {
                "documentId": "Document@64005bf6-23f9-46f8-acfd-440f2f3f65d5",
                "uploadedBy": "User@f29c0b2b-4d8f-48bf-bead-ce22cc293ef8"
            }
        ]
    };


    const iavdResponse = await request.post(IAVD_API_URL,{
        data: IAVD_REQUEST_BODY,
        headers: {
            'content-Type': 'application/json'
        }
    })
    expect(iavdResponse.status()).toBe(200);
    const parsedIavdResponse = await iavdResponse.json();
    console.log(parsedIavdResponse);


 


    const componentData = [
        {
            componentTypeId: "ComponentType@collegeEducation",
            documentTypeId: ["DocumentType@degreeTranscript", "DocumentType@degreeCertificate"]


        },
   
        {
            componentTypeId: "ComponentType@employment",
            documentTypeId: ["DocumentType@experienceLetter"]
        },


        {
            componentTypeId: "ComponentType@license",
            documentTypeId: ["DocumentType@licenseCertificate"]
        },
    ];


    const componentIds = []; // This is to store componentIds for creating Verifiers


    for (const data of componentData) {
        // Construct the dynamic request body for each iteration
        const IA_COMP_BODY = {
            "issuingAuthorityId": issuingAuthorityId,
            "officeId":issuingAuthorityOfficeId,
            "componentTypeId": data.componentTypeId,
            "documentTypeId": data.documentTypeId
        };


        const iaCompResponse = await request.post(IA_COMPONENTS_API_URL, {
            data: IA_COMP_BODY,
            headers: { 'content-Type': 'application/json' }
        });


    const parsedIaCompResponse = await iaCompResponse.json();
    console.log(parsedIaCompResponse);


    componentIds.push(parsedIaCompResponse.entities[0].id); //storing componentId in the array
    }
       
    const IA_COURSE_REQUEST_BODY = {
        "componentTypeId": "ComponentType@collegeEducation",
        "issuingAuthorityId": issuingAuthorityId,
        "officeId": issuingAuthorityOfficeId,
        "department": "Computer Science",
        "course": "Bachelor of Engineering",
        "verificationState": "ACCREDITATION_COMPLETE",
        "valdity": "ACCREDITATED"
    }


    const iaCourseResponse = await request.post(IA_COURSE_URL,{
        data: IA_COURSE_REQUEST_BODY,
        headers: {
            'content-Type': 'application/json'
        }
    })
    expect(iaCourseResponse.status()).toBe(200);
    const parsedIaCourseResponse = await iaCourseResponse.json();
    console.log(parsedIaCourseResponse);
   
    for (const componentId of componentIds) {
        // Generate a random email suffix using faker.js
        const randomString = faker.string.alphanumeric(6);
        const dynamicEmail = `dfg.opsuser.09+${randomString}@gmail.com`;
        const dynamicPhone = `+91${faker.string.numeric(10)}`;


        const IA_VERIFIER_BODY = {
            "issuingAuthorityVerifierDetails": {
                "issuingAuthorityId": issuingAuthorityId,
                "componentId": componentId,
                "name": faker.person.fullName(), // Use a random name for each verifier
                "designation": "Test desg",
                "department": "ALL",
                "course": "ALL",
                "email": dynamicEmail,
                "phone": dynamicPhone,
                "complexity": "No",
                "communicationLanguage": "ENGLISH",
                "verificationWebsiteUrl": "www.jagadeep.com",
                "modeOfCommunication": "WEBSITE",
                "fileProof": [
                    {
                     "documentId": "Document@26bdad0e-785d-4529-8d45-e69cda37e2da",
                     "uploadedBy": "User@38b17fad-39fd-4f26-8bbd-b4cb631699af"
                    }
                ],
            }
        };


        const iaVerifierResponse = await request.post(IA_VERIFIER_URL, {
            data: IA_VERIFIER_BODY,
            headers: { 'content-Type': 'application/json' }
        });


        expect(iaVerifierResponse.status()).toBe(200);
        const parsedIaVerifierResponse = await iaVerifierResponse.json();
        console.log(parsedIaVerifierResponse);
    }
   


   




});
