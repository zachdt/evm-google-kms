'use strict'
// [START kms_iam_add_member]
//
// TODO(developer): Uncomment these variables before running the sample.
//
require('dotenv').config()

const projectId = process.env.PROJECT_ID
const locationId = process.env.LOCATION_ID
const keyRingId = process.env.KEYRING_ID
// const member = 'user:foo@example.com';

// Imports the Cloud KMS library
const {KeyManagementServiceClient} = require('@google-cloud/kms');

// Instantiates a client
const client = new KeyManagementServiceClient();


exports.iamAddMember = async(member, keyId) => {
  // Build the resource name
  console.log('Adding user permissions to key: ', keyId)
  const resourceName = client.cryptoKeyPath(
    projectId,
    locationId,
    keyRingId,
    keyId
  );
  // Get the current IAM policy.
  const [policy] = await client.getIamPolicy({
    resource: resourceName,
  });

  // Add the member to the policy.
  policy.bindings.push({
    role: 'roles/cloudkms.cryptoKeyEncrypterDecrypter',
    members: [member],
  });
  // Save the updated policy.
  const [updatedPolicy] = await client.setIamPolicy({
    resource: resourceName,
    policy: policy,
  });

  console.log(updatedPolicy);
  return updatedPolicy;
}
