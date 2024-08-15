// This is the second step which requires the file to be uploaded. 
// The file path must be from a local machine driving the script ie: '/Users/marc.cashman/Desktop/Time Sheet.png'
// API Refernce document: https://apidocs.teamwork.com/docs/desk/v2/file/post-v2-files-ref-json
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://s3.dualstack.us-east-1.amazonaws.com/tw-desk/',
  CURLOPT_RETURNTRANSFER => true,

  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => array('Content-Type' => 'image/png','key' => 'keyValueFromPreviousStep','policy' => 'policyValueFromPreviousStep','success_action_status' => '201','x-amz-algorithm' => 'AWS4-HMAC-SHA256','x-amz-credential' => 'x-amz-credentialValueFromPreviousStep','x-amz-date' => 'x-amz-dateValueFromPreviousStep','x-amz-signature' => 'x-amz-signatureValueFromPreviousStep','bucket' => 'tw-desk','file'=> new CURLFILE('pathToFileOnLocalMachine')),
  CURLOPT_HTTPHEADER => array(
    'cache-control: no-cache',
    'content-type:  multipart/form-data; boundary=<calculated when request is sent>'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
