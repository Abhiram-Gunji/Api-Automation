const { request } = require('@playwright/test');
const readline = require('readline');

//Staging
const OPS_USER_API_URL = 'http://nginx--nlbC3-hjNa0pnRoiJ7-257492ea392d9b9b.elb.ap-south-1.amazonaws.com/ops-service/opsuser/OpsUser@c1ab025d-c52c-405c-b2a4-d8b5fbcdfb99';
const USER_API_URL = 'http://nginx--nlbC3-hjNa0pnRoiJ7-257492ea392d9b9b.elb.ap-south-1.amazonaws.com/user-service/users/User@1944b4ae-c9c2-486b-a557-779b9346dbde';
//Preprod
//const OPS_USER_API_URL = 'http://nginx--nlbC3-fo19N4Q4LZRb-761f631e132758db.elb.ap-south-1.amazonaws.com/ops-service/opsuser/OpsUser@c1ab025d-c52c-405c-b2a4-d8b5fbcdfb99';
//const USER_API_URL = 'http://nginx--nlbC3-fo19N4Q4LZRb-761f631e132758db.elb.ap-south-1.amazonaws.com/user-service/users/User@1944b4ae-c9c2-486b-a557-779b9346dbde';

// Prompt for user input
function askUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      
      resolve(answer.trim().toLowerCase());
    });
  });
}

(async () => {
  const input = await askUser('Enter the process : ');

  const userGroups = {
    validation: [
      "USERGROUP_OPS_PERFORMER",
      "USERGROUP_COMMON",
      "USERGROUP_VALIDATION",
      "USERGROUP_OPS_USER"
    ],
    verification: [
      "USERGROUP_COMMON",
      "USERGROUP_VERIFICATION",
      "USERGROUP_OPS_USER",
      "USERGROUP_OPS_PERFORMER"
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
       "USERGROUP_REPORT_PUBLISHING",
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
    ],
    applicantsupport: [
    "USERGROUP_OPS_PERFORMER",
    "USERGROUP_COMMON",
    "USERGROUP_APPLICANT_SUPPORT",
    "USERGROUP_OPS_USER"
    ],
    clientcreation: [
      "USERGROUP_OPS_PERFORMER",
      "USERGROUP_COMMON",
      "USERGROUP_CLIENT_CREATION",
      "USERGROUP_OPS_USER"
    ],
    documenttransalation: [
       "USERGROUP_OPS_PERFORMER",
      "USERGROUP_COMMON",
      "USERGROUP_DOCUMENT_TRANSLATOR",
      "USERGROUP_OPS_USER"
    ],
     finance: [
        "USERGROUP_OPS_PERFORMER",
        "USERGROUP_COMMON",
        "USERGROUP_FINANCE",
        "USERGROUP_OPS_USER"
    ],
    vendormapping: [
        "USERGROUP_OPS_PERFORMER",
        "USERGROUP_COMMON",
        "USERGROUP_VENDOR_MANAGEMENT",
        "USERGROUP_OPS_USER"

    ],
    vendorcreation: [
        "USERGROUP_OPS_PERFORMER",
        "USERGROUP_COMMON",
        "USERGROUP_VENDOR_CREATOR",
        "USERGROUP_OPS_USER"

    ],
    vendorapprover: [
        "USERGROUP_OPS_PERFORMER",
        "USERGROUP_COMMON",
        "USERGROUP_VENDOR_APPROVER",
        "USERGROUP_OPS_USER"

    ],
    dataentry:[
  "USERGROUP_OPS_PERFORMER",
  "USERGROUP_COMMON",
  "USERGROUP_CASE_CREATION_ENTRY",
  "USERGROUP_OPS_USER"
 ],
    all: [
      "USERGROUP_OPS_TEAM_LEADER",
      "USERGROUP_IA_ACCREDITATION_RESEARCH",
      "USERGROUP_COMPONENT_QC",
      "USERGROUP_VALIDATION",
      "USERGROUP_SITE_VISIT",
      "USERGROUP_OPS_MANAGER",
      "USERGROUP_OPS_PERFORMER",
      "USERGROUP_OPS_SYSTEM_ADMIN",
      "USERGROUP_CLIENT_USER",
      "USERGROUP_OPS_QA",
      "USERGROUP_IA_CREATION",
      "USERGROUP_PARTNER_USER",
      "USERGROUP_IA_ACCREDITATION_APPROVAL",
      "USERGROUP_APPLICANT",
      "USERGROUP_AUDIT",
      "USERGROUP_FINANCE",
      "USERGROUP_VENDOR_MAPPING",
      "USERGROUP_VENDOR_APPROVER",
      "USERGROUP_IA_APPROVER_MANAGER",
      "USERGROUP_VENDOR_ADMIN",
      "USERGROUP_IA_USER",
      "USERGROUP_DTD_USER",
      "USERGROUP_IA_VERIFIER",
      "USERGROUP_IA_RESEARCH_MANAGER",
      "USERGROUP_COMMON",
      "USERGROUP_CLIENT_CREATION",
      "USERGROUP_CLIENT_ADMIN",
      "USERGROUP_TASK_ALLOCATION",
      "USERGROUP_APPROVER_PUBLISHING",
      "USERGROUP_VERIFICATION_CLOSURE",
      "USERGROUP_IA_RESEARCH",
      "USERGROUP_IA_APPROVER",
      "USERGROUP_ENTITY_EXPLORER",
      "USERGROUP_VENDOR_CREATOR",
      "USERGROUP_EVALUATION_PUBLISHING",
      "USERGROUP_VERIFICATION",
      "USERGROUP_MANAGEMENT",
      "USERGROUP_OPS_USER",
      "USERGROUP_CLIENT_APPROVAL",
      "USERGROUP_APPLICANT_SUPPORT",
      "USERGROUP_INSUFFICIENCY_FOLLOWUP",
      "USERGROUP_DOCUMENT_TRANSLATOR",
      "USERGROUP_VENDOR_USER",
      "USERGROUP_SYSTEM",
      "USERGROUP_USER_CREATION",
      "USERGROUP_PROCESS_MANAGEMENT",
      "USERGROUP_PARTNER_CREATION",
      "USERGROUP_OPS_SUPER_MANAGER",
      "USERGROUP_PARTNER_ADMIN",
      "USERGROUP_REPORT_PUBLISHING"
    ]
  };

  const processIds = {
    validation: "PROCESS_VALIDATION",
    verification: "PROCESS_VERIFICATION",
    verificationqc: "PROCESS_COMPONENT_QC",
    reportqc: "PROCESS_REPORT_PUBLISHING",
    iacreation: "PROCESS_IA_RESEARCH",
    iaapproval: "PROCESS_IA_APPROVER",
    accreditation: "PROCESS_IA_ACCREDITATION_RESEARCH",
    accreditationapproval: "PROCESS_IA_ACCREDITATION_APPROVAL",
    applicantsupport: "PROCESS_APPLICANT_SUPPORT",
    clientcreation: " PROCESS_CLIENT_CREATION",
    documenttransalation: "PROCESS_DOCUMENT_TRANSLATION",
    finance: "PROCESS_FINANCE",
    vendormapping: "PROCESS_VENDOR_MAPPING",
    vendorcreation: "PROCESS_VENDOR_CREATION",
    vendorapprover: "PROCESS_VENDOR_APPROVAL",
    all: "PROCESS_VALIDATION",
    dataentry: "PROCESS_DATA_ENTRY"
  };

  if (!userGroups[input]) {
    console.log("❌ Invalid process. Please check and try again.");
    return;
  }

  const selectedUserGroups = userGroups[input];
  const selectedProcessId = processIds[input];

  //console.log(`\n🔄 Updating data for process: ${input}`);
  console.log("➡️ User Groups:", selectedUserGroups);
  console.log("➡️ Process ID:", selectedProcessId);

  const apiContext = await request.newContext();


  //update the user to 1
  try {
    const opsRes = await apiContext.put(
      OPS_USER_API_URL,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "userLevel" : 0,
          skipValidation:'true'
        }
      }
    );

    if (opsRes.ok()) {
      console.log('user level updated successfully to manager.');
    } else {
      const msg = await opsRes.text();
      if (msg.includes("active checks")) {
        console.log("❌ OpsUser update failed: OpsUser has active checks. unable to update the userlevel.");
      } else {
        console.log('❌ Failed to update OpsUser level:', msg);
      }
    }
  } catch (err) {
    console.log("❌ Error updating OpsUser table:", err.message);
  }


  //Update OpsUser table
  try {
    const opsRes = await apiContext.put(
      OPS_USER_API_URL,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          processId: selectedProcessId,
          skipValidation:'true'
        }
      }
    );

    if (opsRes.ok()) {
      console.log('✅ OpsUser table updated successfully.');
    } else {
      const msg = await opsRes.text();
      if (msg.includes("active checks")) {
        console.log("❌ OpsUser update failed: OpsUser has active checks. Please skip/reassign them first.");
      } else {
        console.log('❌ Failed to update OpsUser table:', msg);
      }
    }
  } catch (err) {
    console.log("❌ Error updating OpsUser table:", err.message);
  }

  // Update User table
  try {
    const userRes = await apiContext.put(
     USER_API_URL,
      {
        headers: {
          'Content-Type': 'application/json',
          'skipValidation': 'true'
        },
        data: {
          userGroups: selectedUserGroups
          
        }
      }
    );

    if (userRes.ok()) {
      console.log('✅ User table updated successfully.');
    } else {
      console.log('❌ Failed to update User table.');
      console.log(await userRes.text());
    }
  } catch (err) {
    console.log("❌ Error updating User table:", err.message);
  }

  //update user level to 3 for performer

   try {
    const opsRes = await apiContext.put(
      OPS_USER_API_URL,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "userLevel" :3,
          skipValidation:'true'
        }
      }
    );

    if (opsRes.ok()) {
      console.log('user level updated successfully to performer.');
    } else {
      const msg = await opsRes.text();
      if (msg.includes("active checks")) {
        console.log("❌ OpsUser update failed: OpsUser has active checks. unable to update the userlevel.");
      } else {
        console.log('❌ Failed to update OpsUser level:', msg);
      }
    }
  } catch (err) {
    console.log("❌ Error updating OpsUser table:", err.message);
  }

  await apiContext.dispose();
})()