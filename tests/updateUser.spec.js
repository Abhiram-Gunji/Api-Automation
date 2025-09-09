const { request } = require('@playwright/test');
const readline = require('readline');

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
    all: "PROCESS_VALIDATION"
  };

  if (!userGroups[input]) {
    console.log("❌ Invalid process. Please check and try again.");
    return;
  }

  const selectedUserGroups = userGroups[input];
  const selectedProcessId = processIds[input];

  console.log(`\n🔄 Updating data for process: ${input}`);
  console.log("➡️ User Groups:", selectedUserGroups);
  console.log("➡️ Process ID:", selectedProcessId);

  const apiContext = await request.newContext();

  //Update OpsUser table
  try {
    const opsRes = await apiContext.put(
      'http://ops-se-nlbC3-TYjd2myKIokm-2b0080682c496557.elb.ap-south-1.amazonaws.com/opsuser/OpsUser@c1ab025d-c52c-405c-b2a4-d8b5fbcdfb99',
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
      'http://user-s-nlbC3-srcrLynLyeVt-045da1d9d623053f.elb.ap-south-1.amazonaws.com/users/User@1944b4ae-c9c2-486b-a557-779b9346dbde',
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
  await apiContext.dispose();
})();
