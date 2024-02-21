// 'use strict';

// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports.getAllImages = async (event) => {
  try {
    const s3Params = {
      Bucket: 'testbucketfortgm',
      Prefix: '/', 
    };
    const s3Response = await s3.listObjectsV2(s3Params).promise();

  
    const imageUrls = s3Response.Contents.map((object) => {
      return `https://${s3Params.Bucket}.s3.amazonaws.com/${object.Key}`;
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Images retrieved successfully',
        images: imageUrls,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error retrieving images from S3' }),
    };
  }
};

